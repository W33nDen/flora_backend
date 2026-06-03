const prisma = require("../db/prismaClient");
const { createError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const { DEFAULT_PAGE, DEFAULT_PER_PAGE } = require("../constants");

/**
 * Maps PostgreSQL database fields to the format expected by the frontend.
 * - photo -> img
 * - description -> desc
 */
const mapBouquet = (b) => {
	if (!b) return b;
	if (Array.isArray(b)) {
		return b.map(mapBouquet);
	}
	return {
		...b,
		img: b.photo,
		desc: b.description,
	};
};

/**
 * GET /api/bouquets
 * Supports query params: q, category, favorite, _sort, _page, _per_page
 * Returns paginated response when _page is provided, otherwise returns all matching bouquets.
 */
const getBouquetsList = ctrlWrapper(async (req, res) => {
	const { q, category, favorite, _sort, _page, _per_page } = req.query;

	// Build Prisma where clause
	const where = {};

	// Filter by category
	if (category) {
		where.category = category;
	}

	// Filter by favorite
	if (favorite !== undefined) {
		where.favorite = favorite === "true";
	}

	// Search by title or description
	if (q) {
		where.OR = [
			{ title: { contains: q, mode: "insensitive" } },
			{ description: { contains: q, mode: "insensitive" } },
		];
	}

	// Build orderBy
	let orderBy = { id: "asc" };
	if (_sort) {
		const isDesc = _sort.startsWith("-");
		const field = isDesc ? _sort.substring(1) : _sort;
		// Map 'img' sort to 'photo' or 'desc' sort to 'description' if requested
		let dbField = field;
		if (field === "img") dbField = "photo";
		if (field === "desc") dbField = "description";
		orderBy = { [dbField]: isDesc ? "desc" : "asc" };
	}

	// Paginate (if _page is provided)
	if (_page) {
		const page = parseInt(_page) || DEFAULT_PAGE;
		const perPage = parseInt(_per_page) || DEFAULT_PER_PAGE;
		const skip = (page - 1) * perPage;

		const [data, totalItems] = await Promise.all([
			prisma.bouquet.findMany({
				where,
				orderBy,
				skip,
				take: perPage,
			}),
			prisma.bouquet.count({ where }),
		]);

		const totalPages = Math.ceil(totalItems / perPage);

		return res.json({
			data: mapBouquet(data),
			first: 1,
			prev: page > 1 ? page - 1 : null,
			next: page < totalPages ? page + 1 : null,
			last: totalPages,
			pages: totalPages,
			items: totalItems,
		});
	}

	// No pagination — return all matching bouquets
	const bouquets = await prisma.bouquet.findMany({ where, orderBy });
	res.json(mapBouquet(bouquets));
});

/**
 * GET /api/bouquets/:id
 * Returns a single bouquet by ID.
 */
const getBouquetById = ctrlWrapper(async (req, res) => {
	const { id } = req.params;
	const bouquet = await prisma.bouquet.findUnique({
		where: { id: parseInt(id) },
	});

	if (!bouquet) {
		throw createError(404, "Not found");
	}

	res.json(mapBouquet(bouquet));
});

/**
 * POST /api/bouquets
 * Creates a new bouquet.
 */
const createBouquet = ctrlWrapper(async (req, res) => {
	const bouquet = await prisma.bouquet.create({
		data: req.body,
	});
	res.status(201).json(mapBouquet(bouquet));
});

/**
 * PUT /api/bouquets/:id
 * Updates an existing bouquet.
 */
const updateBouquet = ctrlWrapper(async (req, res) => {
	const { id } = req.params;

	const existing = await prisma.bouquet.findUnique({
		where: { id: parseInt(id) },
	});

	if (!existing) {
		throw createError(404, "Not found");
	}

	const bouquet = await prisma.bouquet.update({
		where: { id: parseInt(id) },
		data: req.body,
	});

	res.json(mapBouquet(bouquet));
});

/**
 * DELETE /api/bouquets/:id
 * Deletes a bouquet.
 */
const deleteBouquet = ctrlWrapper(async (req, res) => {
	const { id } = req.params;

	const existing = await prisma.bouquet.findUnique({
		where: { id: parseInt(id) },
	});

	if (!existing) {
		throw createError(404, "Not found");
	}

	await prisma.bouquet.delete({
		where: { id: parseInt(id) },
	});

	res.json({ message: "Bouquet deleted successfully" });
});

/**
 * PATCH /api/bouquets/:bouquetId/favorite
 * Updates the favorite status of a bouquet.
 */
const updateStatusBouquet = ctrlWrapper(async (req, res) => {
	const { bouquetId } = req.params;

	const existing = await prisma.bouquet.findUnique({
		where: { id: parseInt(bouquetId) },
	});

	if (!existing) {
		throw createError(404, "Not found");
	}

	const bouquet = await prisma.bouquet.update({
		where: { id: parseInt(bouquetId) },
		data: { favorite: req.body.favorite },
	});

	res.json(mapBouquet(bouquet));
});

module.exports = {
	getBouquetsList,
	getBouquetById,
	createBouquet,
	updateBouquet,
	deleteBouquet,
	updateStatusBouquet,
};

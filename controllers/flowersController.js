const Flower = require("../models/Flower");
const { createError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");
const { DEFAULT_PAGE, DEFAULT_PER_PAGE } = require("../constants");

/**
 * GET /api/flowers
 * Supports query params: category, q, _sort, _page, _per_page
 * Returns paginated response when _page is provided, otherwise returns all matching flowers.
 */
const getFlowersList = ctrlWrapper(async (req, res) => {
	const { category, q, _sort, _page, _per_page } = req.query;

	// 1. Get all flowers
	let flowers = Flower.getAllFlowers();

	// 2. Filter by category
	if (category) {
		flowers = flowers.filter((f) => f.category === category);
	}

	// 3. Filter by search query
	if (q) {
		const query = q.toLowerCase();
		flowers = flowers.filter(
			(f) =>
				f.title.toLowerCase().includes(query) ||
				f.desc.toLowerCase().includes(query),
		);
	}

	// 4. Sort
	if (_sort) {
		const isDesc = _sort.startsWith("-");
		const field = isDesc ? _sort.substring(1) : _sort;
		flowers.sort((a, b) => {
			const valA = a[field];
			const valB = b[field];
			if (typeof valA === "string") {
				return isDesc
					? valB.localeCompare(valA)
					: valA.localeCompare(valB);
			}
			return isDesc ? valB - valA : valA - valB;
		});
	}

	// 5. Paginate (if _page is provided)
	if (_page) {
		const page = parseInt(_page) || DEFAULT_PAGE;
		const perPage = parseInt(_per_page) || DEFAULT_PER_PAGE;
		const totalItems = flowers.length;
		const totalPages = Math.ceil(totalItems / perPage);
		const startIndex = (page - 1) * perPage;
		const endIndex = startIndex + perPage;
		const pageData = flowers.slice(startIndex, endIndex);

		return res.json({
			data: pageData,
			first: 1,
			prev: page > 1 ? page - 1 : null,
			next: page < totalPages ? page + 1 : null,
			last: totalPages,
			pages: totalPages,
			items: totalItems,
		});
	}

	// No pagination — return all matching flowers
	res.json(flowers);
});

/**
 * GET /api/flowers/:id
 * Returns a single flower by ID.
 */
const getFlowerById = ctrlWrapper(async (req, res) => {
	const { id } = req.params;
	const flower = Flower.getById(id);

	if (!flower) {
		throw createError(404, `Flower with id=${id} not found`);
	}

	res.json(flower);
});

module.exports = {
	getFlowersList,
	getFlowerById,
};

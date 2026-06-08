const bouquetsService = require("../services/bouquetServices");
const { ctrlWrapper } = require("../decorators");
const { HttpError } = require("../helpers");

/**
 * GET /api/bouquets
 * Get list of all bouquets.
 */
const listBouquets = ctrlWrapper(async (req, res) => {
	const result = await bouquetsService.listBouquets();
	res.json(result);
});

/**
 * GET /api/bouquets/:id
 * Get a single bouquet by ID.
 */
const getBouquetById = ctrlWrapper(async (req, res) => {
	const { id } = req.params;
	const result = await bouquetsService.getBouquetById(id);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
});

/**
 * DELETE /api/bouquets/:id
 * Remove a bouquet by ID.
 */
const removeBouquet = ctrlWrapper(async (req, res) => {
	const { id } = req.params;
	const result = await bouquetsService.removeBouquets(id);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
});

/**
 * POST /api/bouquets
 * Create a new bouquet.
 */
const addBouquet = ctrlWrapper(async (req, res) => {
	const result = await bouquetsService.addBouquet(req.body);
	res.status(201).json(result);
});

/**
 * PUT /api/bouquets/:id
 * Update a bouquet by ID.
 */
const updateBouquet = ctrlWrapper(async (req, res) => {
	const { id } = req.params;
	const result = await bouquetsService.updateBouquet(id, req.body);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
});

module.exports = {
	listBouquets,
	getBouquetById,
	removeBouquet,
	addBouquet,
	updateBouquet,
};

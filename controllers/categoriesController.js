const Flower = require("../models/Flower");
const { ctrlWrapper } = require("../decorators");

/**
 * GET /api/categories
 * Returns a list of unique flower categories.
 */
const getCategoriesList = ctrlWrapper(async (req, res) => {
	const categories = Flower.getCategories();
	res.json(categories);
});

module.exports = {
	getCategoriesList,
};

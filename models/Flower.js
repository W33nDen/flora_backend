const path = require("path");
const fs = require("fs");

const DB_PATH = path.join(__dirname, "..", "db.json");

/**
 * Reads the flowers collection from db.json.
 * @returns {Array} Array of flower objects
 */
function getAllFlowers() {
	const raw = fs.readFileSync(DB_PATH, "utf-8");
	const db = JSON.parse(raw);
	return db.flowers || [];
}

/**
 * Returns a single flower by ID.
 * @param {number|string} id
 * @returns {Object|null}
 */
function getById(id) {
	const flowers = getAllFlowers();
	return flowers.find((f) => String(f.id) === String(id)) || null;
}

/**
 * Filters flowers by category.
 * @param {string} category
 * @returns {Array}
 */
function getByCategory(category) {
	const flowers = getAllFlowers();
	return flowers.filter((f) => f.category === category);
}

/**
 * Searches flowers by title or description.
 * @param {string} query
 * @returns {Array}
 */
function search(query) {
	const flowers = getAllFlowers();
	const q = query.toLowerCase();
	return flowers.filter(
		(f) =>
			f.title.toLowerCase().includes(q) ||
			f.desc.toLowerCase().includes(q),
	);
}

/**
 * Returns all unique category names.
 * @returns {Array<string>}
 */
function getCategories() {
	const flowers = getAllFlowers();
	return [...new Set(flowers.map((f) => f.category))];
}

module.exports = {
	getAllFlowers,
	getById,
	getByCategory,
	search,
	getCategories,
};

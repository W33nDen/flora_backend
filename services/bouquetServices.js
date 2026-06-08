const fs = require("fs/promises");
const path = require("path");

const bouquetsPath = path.join(__dirname, "../db/bouquets.json");

/**
 * Reads all bouquets from bouquets.json.
 * @returns {Promise<Array>}
 */
async function listBouquets() {
	const data = await fs.readFile(bouquetsPath, "utf-8");
	return JSON.parse(data);
}

/**
 * Finds a bouquet by ID.
 * @param {number|string} id
 * @returns {Promise<Object|null>}
 */
async function getBouquetById(id) {
	const bouquets = await listBouquets();
	const result = bouquets.find((b) => String(b.id) === String(id));
	return result || null;
}

/**
 * Removes a bouquet by ID.
 * @param {number|string} id
 * @returns {Promise<Object|null>}
 */
async function removeBouquets(id) {
	const bouquets = await listBouquets();
	const index = bouquets.findIndex((b) => String(b.id) === String(id));
	if (index === -1) {
		return null;
	}
	const [removed] = bouquets.splice(index, 1);
	await fs.writeFile(bouquetsPath, JSON.stringify(bouquets, null, 2), "utf-8");
	return removed;
}

/**
 * Adds a new bouquet.
 * @param {Object} data - {photo, title, description, price, favourite}
 * @returns {Promise<Object>}
 */
async function addBouquet({ photo, title, description, price, favourite }) {
	const bouquets = await listBouquets();
	
	// Generate a unique numeric ID
	const maxId = bouquets.reduce((max, b) => (b.id > max ? b.id : max), 0);
	const newId = maxId + 1;

	const newBouquet = {
		id: newId,
		photo,
		title,
		description,
		price: Number(price),
		favourite: Boolean(favourite),
	};

	bouquets.push(newBouquet);
	await fs.writeFile(bouquetsPath, JSON.stringify(bouquets, null, 2), "utf-8");
	return newBouquet;
}

/**
 * Updates a bouquet by ID.
 * @param {number|string} id
 * @param {Object} data - Fields to update
 * @returns {Promise<Object|null>}
 */
async function updateBouquet(id, data) {
	const bouquets = await listBouquets();
	const index = bouquets.findIndex((b) => String(b.id) === String(id));
	if (index === -1) {
		return null;
	}

	const updatedBouquet = {
		...bouquets[index],
		...data,
		// Ensure types are correct if updated
		price: data.price !== undefined ? Number(data.price) : bouquets[index].price,
		favourite: data.favourite !== undefined ? Boolean(data.favourite) : bouquets[index].favourite,
	};

	bouquets[index] = updatedBouquet;
	await fs.writeFile(bouquetsPath, JSON.stringify(bouquets, null, 2), "utf-8");
	return updatedBouquet;
}

module.exports = {
	listBouquets,
	getBouquetById,
	removeBouquets,
	addBouquet,
	updateBouquet,
};

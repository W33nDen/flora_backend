const {
	getBouquetsQuerySchema,
	createBouquetSchema,
	updateBouquetSchema,
	updateFavoriteSchema,
} = require("./bouquetsSchemas");
const { createOrderSchema } = require("./ordersSchemas");

module.exports = {
	getBouquetsQuerySchema,
	createBouquetSchema,
	updateBouquetSchema,
	updateFavoriteSchema,
	createOrderSchema,
};

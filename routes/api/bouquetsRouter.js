const { bouquets: c } = require("../../controllers");
const { createRouter, validateQuery, validateBody } = require("../../helpers");
const {
	getBouquetsQuerySchema,
	createBouquetSchema,
	updateBouquetSchema,
	updateFavoriteSchema,
} = require("../../schemas");

const bouquetsRouterOptions = [
	{
		method: "get",
		route: "/",
		middlewares: [validateQuery(getBouquetsQuerySchema)],
		controller: c.getBouquetsList,
	},
	{
		method: "get",
		route: "/:id",
		middlewares: null,
		controller: c.getBouquetById,
	},
	{
		method: "post",
		route: "/",
		middlewares: [validateBody(createBouquetSchema)],
		controller: c.createBouquet,
	},
	{
		method: "put",
		route: "/:id",
		middlewares: [validateBody(updateBouquetSchema)],
		controller: c.updateBouquet,
	},
	{
		method: "delete",
		route: "/:id",
		middlewares: null,
		controller: c.deleteBouquet,
	},
	{
		method: "patch",
		route: "/:bouquetId/favorite",
		middlewares: [validateBody(updateFavoriteSchema)],
		controller: c.updateStatusBouquet,
	},
];

const bouquetsRouter = createRouter({
	options: bouquetsRouterOptions,
});

bouquetsRouter.setRouter();

module.exports = bouquetsRouter.router;

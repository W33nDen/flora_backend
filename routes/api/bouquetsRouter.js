const { bouquetsControllers: c } = require("../../controllers");
const { createRouter, validateBody } = require("../../helpers");
const {
	createBouquetSchema,
	updateBouquetSchema,
} = require("../../schemas");

const bouquetsRouterOptions = [
	{
		method: "get",
		route: "/",
		middlewares: null,
		controller: c.listBouquets,
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
		controller: c.addBouquet,
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
		controller: c.removeBouquet,
	},
];

const bouquetsRouter = createRouter({
	options: bouquetsRouterOptions,
});

bouquetsRouter.setRouter();

module.exports = bouquetsRouter.router;

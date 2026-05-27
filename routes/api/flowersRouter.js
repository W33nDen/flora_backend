const { flowers: c } = require("../../controllers");
const { createRouter, validateQuery } = require("../../helpers");
const { getFlowersQuerySchema } = require("../../schemas");

const flowersRouterOptions = [
	{
		method: "get",
		route: "/",
		middlewares: [validateQuery(getFlowersQuerySchema)],
		controller: c.getFlowersList,
	},
	{
		method: "get",
		route: "/:id",
		middlewares: null,
		controller: c.getFlowerById,
	},
];

const flowersRouter = createRouter({
	options: flowersRouterOptions,
});

flowersRouter.setRouter();

module.exports = flowersRouter.router;

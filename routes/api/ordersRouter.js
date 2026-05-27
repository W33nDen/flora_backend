const { orders: c } = require("../../controllers");
const { createRouter, validateBody } = require("../../helpers");
const { createOrderSchema } = require("../../schemas");

const ordersRouterOptions = [
	{
		method: "get",
		route: "/",
		middlewares: null,
		controller: c.getOrders,
	},
	{
		method: "post",
		route: "/",
		middlewares: [validateBody(createOrderSchema)],
		controller: c.createOrder,
	},
];

const ordersRouter = createRouter({
	options: ordersRouterOptions,
});

ordersRouter.setRouter();

module.exports = ordersRouter.router;

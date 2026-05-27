const Order = require("../models/Order");
const { ctrlWrapper } = require("../decorators");

/**
 * POST /api/orders
 * Creates a new order and returns confirmation.
 */
const createOrder = ctrlWrapper(async (req, res) => {
	const order = Order.createOrder(req.body);
	res.status(201).json({
		message: "Order created successfully",
		order,
	});
});

/**
 * GET /api/orders
 * Returns all orders (for testing purposes).
 */
const getOrders = ctrlWrapper(async (req, res) => {
	const orders = Order.getAllOrders();
	res.json(orders);
});

module.exports = {
	createOrder,
	getOrders,
};

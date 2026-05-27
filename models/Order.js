/**
 * Order model (stub).
 * In a real application, this would connect to a database.
 * For now, orders are stored in memory.
 */
const orders = [];

let nextId = 1;

/**
 * Creates a new order.
 * @param {Object} orderData - { name, phone, email, comment }
 * @returns {Object} The created order with an ID
 */
function createOrder(orderData) {
	const order = {
		id: nextId++,
		...orderData,
		createdAt: new Date().toISOString(),
	};
	orders.push(order);
	return order;
}

/**
 * Returns all orders.
 * @returns {Array}
 */
function getAllOrders() {
	return orders;
}

module.exports = {
	createOrder,
	getAllOrders,
};

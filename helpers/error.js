/**
 * Creates an HTTP error with a status code and message.
 * @param {number} status - HTTP status code
 * @param {string} message - Error message
 * @returns {Error}
 */
const createError = (status, message) => {
	const error = new Error(message);
	error.status = status;
	return error;
};

/**
 * Updates an existing error with new status/message.
 * @param {Error} error - Existing error object
 * @param {number} status - HTTP status code
 * @param {string} message - Error message
 * @returns {Error}
 */
const updateError = (error, status, message) => {
	error.status = status;
	error.message = message;
	return error;
};

module.exports = {
	createError,
	updateError,
};

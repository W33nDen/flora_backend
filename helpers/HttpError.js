/**
 * Creates an HTTP error with a status code and message.
 * @param {number} status - HTTP status code
 * @param {string} message - Error message
 * @returns {Error}
 */
const HttpError = (status, message) => {
	const error = new Error(message);
	error.status = status;
	return error;
};

module.exports = HttpError;

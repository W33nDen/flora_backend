/**
 * Wraps an async controller function with try/catch,
 * forwarding errors to Express error-handling middleware.
 * @param {Function} fn - Async controller function
 * @returns {Function} Express middleware
 */
const ctrlWrapper = (fn) => {
	return async (req, res, next) => {
		try {
			await fn(req, res, next);
		} catch (error) {
			next(error);
		}
	};
};

module.exports = ctrlWrapper;

const HttpError = require("./HttpError");

/**
 * Factory that returns an Express middleware validating req.body against a Joi schema.
 * @param {import('joi').ObjectSchema} schema - Joi validation schema
 * @returns {Function} Express middleware
 */
const validateBody = (schema) => {
	return (req, _, next) => {
		const { error } = schema.validate(req.body);
		if (error) {
			return next(HttpError(400, error.message));
		}
		next();
	};
};

module.exports = validateBody;

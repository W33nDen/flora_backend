const { createError } = require("./error");

/**
 * Factory that returns an Express middleware validating req.query against a Joi schema.
 * @param {import('joi').ObjectSchema} schema - Joi validation schema
 * @returns {Function} Express middleware
 */
const validateQuery = (schema) => {
	return (req, _, next) => {
		const { error } = schema.validate(req.query, { abortEarly: false });
		if (error) {
			const message = error.details
				.map((detail) => detail.message)
				.join(", ");
			return next(createError(400, message));
		}
		next();
	};
};

module.exports = validateQuery;

const { createError } = require("../../helpers");

/**
 * Middleware factory for validating req.query against a Joi schema.
 * @param {import('joi').ObjectSchema} schema
 * @returns {Function}
 */
const validateQueryMiddleware = (schema) => {
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

/**
 * Middleware factory for validating req.body against a Joi schema.
 * @param {import('joi').ObjectSchema} schema
 * @returns {Function}
 */
const validateBodyMiddleware = (schema) => {
	return (req, _, next) => {
		const { error } = schema.validate(req.body, { abortEarly: false });
		if (error) {
			const message = error.details
				.map((detail) => detail.message)
				.join(", ");
			return next(createError(400, message));
		}
		next();
	};
};

module.exports = {
	validateQueryMiddleware,
	validateBodyMiddleware,
};

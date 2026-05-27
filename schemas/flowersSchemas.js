const Joi = require("joi");

/**
 * Validation schema for GET /api/flowers query parameters.
 * All parameters are optional.
 */
const getFlowersQuerySchema = Joi.object({
	category: Joi.string().valid("top", "standart").optional(),
	q: Joi.string().max(100).optional(),
	_sort: Joi.string()
		.pattern(/^-?(price|title)$/)
		.optional()
		.messages({
			"string.pattern.base":
				"_sort must be one of: price, title, -price, -title",
		}),
	_page: Joi.number().integer().min(1).optional(),
	_per_page: Joi.number().integer().min(1).max(50).optional(),
});

module.exports = {
	getFlowersQuerySchema,
};

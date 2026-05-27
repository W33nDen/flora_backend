const Joi = require("joi");

/**
 * Validation schema for POST /api/orders request body.
 */
const createOrderSchema = Joi.object({
	name: Joi.string().min(2).max(50).required().messages({
		"string.min": "Name must be at least 2 characters",
		"string.max": "Name must be at most 50 characters",
		"any.required": "Name is required",
	}),
	phone: Joi.string()
		.pattern(/^[+]?[\d\s()-]{7,20}$/)
		.required()
		.messages({
			"string.pattern.base": "Please provide a valid phone number",
			"any.required": "Phone is required",
		}),
	email: Joi.string().email().required().messages({
		"string.email": "Please provide a valid email address",
		"any.required": "Email is required",
	}),
	comment: Joi.string().max(500).optional().allow(""),
});

module.exports = {
	createOrderSchema,
};

const Joi = require("joi");

/**
 * Validation schema for GET /api/bouquets query parameters.
 * All parameters are optional.
 */
const getBouquetsQuerySchema = Joi.object({
	q: Joi.string().max(100).optional(),
	category: Joi.string().optional(),
	favorite: Joi.boolean().optional(),
	_sort: Joi.string()
		.pattern(/^-?(title|createdAt|price)$/)
		.optional()
		.messages({
			"string.pattern.base":
				"_sort must be one of: title, createdAt, price, -title, -createdAt, -price",
		}),
	_page: Joi.number().integer().min(1).optional(),
	_per_page: Joi.number().integer().min(1).max(50).optional(),
});

/**
 * Validation schema for POST /api/bouquets request body.
 */
const createBouquetSchema = Joi.object({
	photo: Joi.string().required().messages({
		"any.required": "Photo URL is required",
	}),
	title: Joi.string().min(2).max(100).required().messages({
		"string.min": "Title must be at least 2 characters",
		"string.max": "Title must be at most 100 characters",
		"any.required": "Title is required",
	}),
	description: Joi.string().min(10).max(1000).required().messages({
		"string.min": "Description must be at least 10 characters",
		"string.max": "Description must be at most 1000 characters",
		"any.required": "Description is required",
	}),
	price: Joi.number().min(0).optional(),
	category: Joi.string().optional(),
	favorite: Joi.boolean().optional(),
});

/**
 * Validation schema for PUT /api/bouquets/:id request body.
 */
const updateBouquetSchema = Joi.object({
	photo: Joi.string().optional(),
	title: Joi.string().min(2).max(100).optional(),
	description: Joi.string().min(10).max(1000).optional(),
	price: Joi.number().min(0).optional(),
	category: Joi.string().optional(),
	favorite: Joi.boolean().optional(),
})
	.min(1)
	.messages({
		"object.min": "Request body must have at least one field to update",
	});

/**
 * Validation schema for PATCH /api/bouquets/:bouquetId/favorite.
 * Only the 'favorite' field is allowed.
 */
const updateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required().messages({
		"any.required": "missing field favorite",
	}),
});

module.exports = {
	getBouquetsQuerySchema,
	createBouquetSchema,
	updateBouquetSchema,
	updateFavoriteSchema,
};

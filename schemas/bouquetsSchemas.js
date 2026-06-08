const Joi = require("joi");

/**
 * Validation schema for POST /api/bouquets request body.
 * Fields: photo, title, description, price, favourite (all required)
 */
const createBouquetSchema = Joi.object({
	photo: Joi.string().required().messages({
		"any.required": "photo is required",
	}),
	title: Joi.string().required().messages({
		"any.required": "title is required",
	}),
	description: Joi.string().required().messages({
		"any.required": "description is required",
	}),
	price: Joi.number().required().messages({
		"any.required": "price is required",
	}),
	favourite: Joi.boolean().required().messages({
		"any.required": "favourite is required",
	}),
});

/**
 * Validation schema for PUT /api/bouquets/:id request body.
 * Fields: photo, title, description, price, favourite (all optional, min 1 field)
 */
const updateBouquetSchema = Joi.object({
	photo: Joi.string(),
	title: Joi.string(),
	description: Joi.string(),
	price: Joi.number(),
	favourite: Joi.boolean(),
})
	.min(1)
	.messages({
		"object.min": "Body must have at least one field",
	});

module.exports = {
	createBouquetSchema,
	updateBouquetSchema,
};

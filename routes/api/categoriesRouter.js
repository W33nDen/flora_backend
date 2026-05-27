const { categories: c } = require("../../controllers");
const { createRouter } = require("../../helpers");

const categoriesRouterOptions = [
	{
		method: "get",
		route: "/",
		middlewares: null,
		controller: c.getCategoriesList,
	},
];

const categoriesRouter = createRouter({
	options: categoriesRouterOptions,
});

categoriesRouter.setRouter();

module.exports = categoriesRouter.router;

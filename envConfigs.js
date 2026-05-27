require("dotenv").config();

const { PORT = 3000, NODE_ENV = "development" } = process.env;

module.exports = {
	PORT,
	NODE_ENV,
};

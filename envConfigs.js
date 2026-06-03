require("dotenv").config();

const { PORT = 3000, NODE_ENV = "development", DATABASE_URL } = process.env;

module.exports = {
	PORT,
	NODE_ENV,
	DATABASE_URL,
};

require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const { Pool } = require("pg");

/**
 * Singleton PrismaClient для підключення до PostgreSQL.
 * Використовує @prisma/adapter-pg для підключення до бази даних.
 * URL бази даних зчитується з DATABASE_URL у .env файлі.
 */
const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;

/**
 * Seed script: завантажує букети з db.json у PostgreSQL через Prisma.
 * Запуск: node scripts/seed.js
 */
require("dotenv").config();
const prisma = require("../db/prismaClient");
const fs = require("fs");
const path = require("path");

const DB_PATH = path.join(__dirname, "..", "db.json");

async function seed() {
	try {
		console.log("Connecting to database...");
		await prisma.$connect();
		console.log("Database connection successful");

		// Read flowers from db.json
		const raw = fs.readFileSync(DB_PATH, "utf-8");
		const db = JSON.parse(raw);
		const flowers = db.flowers || [];

		console.log(`Found ${flowers.length} flowers in db.json`);

		// Clear existing bouquets
		await prisma.bouquet.deleteMany();
		console.log("Cleared existing bouquets from database");

		// Map old fields to new schema
		const bouquets = flowers.map((f) => ({
			photo: f.img,
			title: f.title,
			description: f.desc,
			price: Number(f.price),
			category: f.category,
			favorite: f.category === "top", // top sellers marked as favorites
		}));

		// Insert bouquets
		const result = await prisma.bouquet.createMany({
			data: bouquets,
		});

		console.log(`✅ Successfully seeded ${result.count} bouquets!`);

		// Verify
		const count = await prisma.bouquet.count();
		console.log(`Total bouquets in database: ${count}`);
	} catch (error) {
		console.error("❌ Seed error:", error.message);
		process.exit(1);
	} finally {
		await prisma.$disconnect();
	}
}

seed();

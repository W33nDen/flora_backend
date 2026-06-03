const { PORT } = require("./envConfigs");
const app = require("./app");
const prisma = require("./db/prismaClient");

prisma
	.$connect()
	.then(() => {
		console.log("Database connection successful");
		app.listen(PORT, () => {
			console.log(`Server is running. Use our API on port: ${PORT}`);
		});
	})
	.catch((err) => {
		console.error(`Database connection error: ${err.message}`);
		process.exit(1);
	});

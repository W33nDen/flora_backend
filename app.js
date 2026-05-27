const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const {
	flowersRouter,
	categoriesRouter,
	ordersRouter,
} = require("./routes/api");

const app = express();

const loggerFormat = app.get("env") === "development" ? "dev" : "short";

app.use(morgan(loggerFormat));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/flowers", flowersRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/orders", ordersRouter);

app.use((_, res, __) => {
	res.status(404).json({ message: "Route not found" });
});

app.use((err, _, res, __) => {
	const { message = "Server error", status = 500 } = err;
	res.status(status).json({ message });
});

module.exports = app;

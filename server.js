const { PORT } = require("./envConfigs");
const app = require("./app");

app.listen(PORT, () => {
	console.log(`Server is running. Use our API on port: ${PORT}`);
});

import "dotenv/config";
import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { FreelanceRoute } from "./routes/freelances.route.js";
import { jsonApiResponseMiddleware } from "./middlewares/json-api-response.middleware.js";
import { CompanyRoute } from "./routes/companies.route.js";
import { ProjectRouter } from "./routes/projects.route.js";

const swaggerOptions = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Skill Match API",
			version: "1.0.0",
			description: "API to match freelancers with projects based on their skills",
		},
		servers: [
			{
				url: "http://localhost:8000",
				description: "Development server",
			},
		],
	},
	apis: ["./src/swagger/*.ts"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(jsonApiResponseMiddleware);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/freelances", FreelanceRoute);
app.use("/companies", CompanyRoute);
app.use("/projects", ProjectRouter);

app.listen(8000, () => console.log("✅ Server is running on port 8000"));

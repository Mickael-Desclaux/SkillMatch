import "dotenv/config";
import express from "express";
import { FreelanceRoute } from "./routes/freelances.route.js";
import { jsonApiResponseMiddleware } from "./middlewares/json-api-response.middleware.js";
import { CompanyRoute } from "./routes/companies.route.js";
import { ProjectRouter } from "./routes/projects.route.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(jsonApiResponseMiddleware);

app.use("/freelances", FreelanceRoute);
app.use("/companies", CompanyRoute);
app.use("/projects", ProjectRouter);

app.listen(8000, () => console.log("✅ Server is running on port 8000"));

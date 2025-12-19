import { Router } from "express";
import {
	createCompany,
	createProject,
	getAllCompanies,
	getAllMatchingCandidates,
	getAllProjects,
	getCompanyById,
} from "../controllers/companies.controller.js";
import { validateBody } from "../middlewares/validate.middleware.js";
import {
	CreateCompanyDtoSchema,
	CreateProjectDtoSchema,
} from "../types/company.dto.js";

const router = Router();

router.get("/", getAllCompanies);
router.get("/:id", getCompanyById);
router.get("/:id/projects", getAllProjects);
router.get(
	"/:id/projects/:projectId/matching-candidates",
	getAllMatchingCandidates
);
router.post("/", validateBody(CreateCompanyDtoSchema), createCompany);
router.post(
	"/:id/projects",
	validateBody(CreateProjectDtoSchema),
	createProject
);

export { router as CompanyRoute };

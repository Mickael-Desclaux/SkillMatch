import { Router } from "express";
import {
	createCompany,
	createProject,
	getAllCompanies,
	getAllMatchingCandidates,
	getAllProjects,
	getCompanyById,
} from "../controllers/companies.controller.js";

const router = Router();

router.get("/", getAllCompanies);
router.get("/:id", getCompanyById);
router.get("/:id/projects", getAllProjects);
router.get(
	"/:id/projects/:projectId/matchingCandidates",
	getAllMatchingCandidates
);
router.post("/", createCompany);
router.post("/:id/projects", createProject);

export { router as CompanyRoute };

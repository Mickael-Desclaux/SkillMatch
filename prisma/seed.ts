import "dotenv/config";
import { prisma } from "../src/orm/client.js";

async function main() {
	// Create Freelances
	await prisma.freelance.createMany({
		data: [
			{
				name: "Alice Martin",
				email: "alice.martin@example.com",
				skills: ["React", "TypeScript", "Node.js", "PostgreSQL"],
				dailyRate: 500,
			},
			{
				name: "Bob Dupont",
				email: "bob.dupont@example.com",
				skills: ["Python", "Django", "Docker", "AWS"],
				dailyRate: 450,
			},
			{
				name: "Claire Bernard",
				email: "claire.bernard@example.com",
				skills: ["Vue.js", "JavaScript", "CSS", "Figma"],
				dailyRate: 400,
			},
			{
				name: "David Rousseau",
				email: "david.rousseau@example.com",
				skills: ["Java", "Spring Boot", "Kubernetes", "MongoDB"],
				dailyRate: 550,
			},
			{
				name: "Emma Leroy",
				email: "emma.leroy@example.com",
				skills: ["React Native", "Swift", "Kotlin", "Firebase"],
				dailyRate: 480,
			},
			{
				name: "François Petit",
				email: "francois.petit@example.com",
				skills: ["Angular", "TypeScript", "RxJS", "GraphQL"],
				dailyRate: 460,
			},
			{
				name: "Sophie Lambert",
				email: "sophie.lambert@example.com",
				skills: ["DevOps", "Terraform", "Jenkins", "AWS", "Docker"],
				dailyRate: 520,
			},
			{
				name: "Lucas Moreau",
				email: "lucas.moreau@example.com",
				skills: ["Go", "Microservices", "Redis", "gRPC"],
				dailyRate: 490,
			},
		],
	});

	// Get created freelances to use their IDs for projects
	const freelances = await prisma.freelance.findMany({
		orderBy: { id: "asc" },
		take: 8,
	});

	// Create Companies
	await prisma.company.createMany({
		data: [
			{
				name: "TechCorp Solutions",
				industry: "Technology",
			},
			{
				name: "FinanceHub",
				industry: "Finance",
			},
			{
				name: "HealthTech Innovations",
				industry: "Healthcare",
			},
			{
				name: "E-Commerce Plus",
				industry: "Retail",
			},
			{
				name: "GreenEnergy Systems",
				industry: "Energy",
			},
		],
	});

	// Get created companies to use their IDs for projects
	const companies = await prisma.company.findMany({
		orderBy: { id: "asc" },
		take: 5,
	});

	// Create Projects
	await prisma.project.createMany({
		data: [
			{
				title: "Refonte du site web corporate",
				description:
					"Moderniser le site web de l'entreprise avec React et TypeScript pour améliorer l'expérience utilisateur.",
				requestedSkills: ["React", "TypeScript", "CSS"],
				maxDailyRate: 520,
				companyId: companies[0]!.id,
				freelanceId: freelances[0]!.id,
			},
			{
				title: "API REST pour plateforme SaaS",
				description:
					"Développer une API REST scalable avec Node.js pour notre nouvelle plateforme SaaS.",
				requestedSkills: ["Node.js", "TypeScript", "PostgreSQL", "Docker"],
				maxDailyRate: 500,
				companyId: companies[0]!.id,
			},

			{
				title: "Application de trading mobile",
				description:
					"Créer une application mobile native pour iOS et Android permettant le trading en temps réel.",
				requestedSkills: ["React Native", "Swift", "Kotlin"],
				maxDailyRate: 550,
				companyId: companies[1]!.id,
				freelanceId: freelances[4]!.id,
			},
			{
				title: "Dashboard analytique",
				description:
					"Développer un dashboard d'analyse financière avec des graphiques interactifs.",
				requestedSkills: ["Angular", "TypeScript", "GraphQL"],
				maxDailyRate: 480,
				companyId: companies[1]!.id,
			},

			{
				title: "Plateforme de télémédecine",
				description:
					"Construire une plateforme web sécurisée pour les consultations médicales à distance.",
				requestedSkills: ["Python", "Django", "PostgreSQL", "AWS"],
				maxDailyRate: 500,
				companyId: companies[2]!.id,
				freelanceId: freelances[1]!.id,
			},
			{
				title: "Infrastructure cloud sécurisée",
				description:
					"Mettre en place une infrastructure cloud hautement sécurisée pour des données médicales.",
				requestedSkills: ["DevOps", "AWS", "Terraform", "Docker"],
				maxDailyRate: 550,
				companyId: companies[2]!.id,
			},

			{
				title: "Marketplace B2B",
				description:
					"Développer une marketplace B2B avec système de paiement et gestion des stocks.",
				requestedSkills: ["Java", "Spring Boot", "MongoDB", "Kubernetes"],
				maxDailyRate: 580,
				companyId: companies[3]!.id,
				freelanceId: freelances[3]!.id,
			},
			{
				title: "Refonte UX/UI de l'application",
				description:
					"Améliorer l'expérience utilisateur de notre application e-commerce existante.",
				requestedSkills: ["Vue.js", "JavaScript", "CSS", "Figma"],
				maxDailyRate: 420,
				companyId: companies[3]!.id,
				freelanceId: freelances[2]!.id,
			},

			{
				title: "Système de monitoring IoT",
				description:
					"Développer un système de monitoring pour les panneaux solaires avec architecture microservices.",
				requestedSkills: ["Go", "Microservices", "Redis", "gRPC"],
				maxDailyRate: 510,
				companyId: companies[4]!.id,
				freelanceId: freelances[7]!.id,
			},
			{
				title: "Pipeline CI/CD",
				description:
					"Automatiser les déploiements avec un pipeline CI/CD robuste.",
				requestedSkills: ["DevOps", "Jenkins", "Docker", "Kubernetes"],
				maxDailyRate: 530,
				companyId: companies[4]!.id,
			},
		],
	});

	console.log("✅ Data successfully ingested");
}

main()
	.catch((e) => {
		console.error("❌ Error during seeding:", e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

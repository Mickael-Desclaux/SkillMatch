#!/usr/bin/env node

import { existsSync, copyFileSync } from "fs";
import { join } from "path";

const envExamplePath = join(__dirname, ".env.example");
const envPath = join(__dirname, ".env");

// Check if .env.example exists
if (!existsSync(envExamplePath)) {
	console.error("❌ Erreur: Le fichier .env.example n'existe pas");
	process.exit(1);
}

try {
	// Copy .env.example to .env
	copyFileSync(envExamplePath, envPath);
	console.log("✅ Fichier .env créé avec succès!");
} catch (error) {
	console.error(
		"❌ Erreur lors de la création du fichier .env:",
		error.message
	);
	process.exit(1);
}

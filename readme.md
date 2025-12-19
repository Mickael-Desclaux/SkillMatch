# Skill Match API

API de matching entre freelances et projets basée sur les compétences et le taux journalier.

**Contexte**: Projet de création d'API réalisé dans le cadre de ma formation chez LiveCampus.

## Technologies utilisées

- **Runtime**: Node.js avec TypeScript
- **Framework**: Express 5
- **Base de données**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Documentation**: Swagger (swagger-jsdoc + swagger-ui-express)
- **Gestionnaire de paquets**: pnpm
- **Containerisation**: Docker & Docker Compose

## Configuration

**Port**: 8000

**Base URL**: http://localhost:8000

## Format des réponses

Toutes les réponses sont au format JSON-API standardisé grâce au middleware `jsonApiResponseMiddleware`.

### Succès

```json
{
  "success": true,
  "data": <résultat>,
  "status": <code HTTP>
}
```

### Erreur

```json
{
  "success": false,
  "error": "<message d'erreur>",
  "status": <code HTTP>
}
```

## Algorithme de matching

Le matching entre freelances et projets est basé sur:

1. **Compétences**: Correspondance entre les compétences du freelance et celles requises par le projet
2. **Taux journalier**: Le taux du freelance doit être inférieur ou égal au taux maximum du projet
3. **Score**: Les candidats sont classés par nombre de compétences correspondantes (décroissant)

## Démarrage

Avant de démarrer l'app, il faut vous rendre dans le répertoire du projet:

```bash
cd skill_match
```

Il faut ensuite exécuter le script setup-env.js, qui va créer un fichier .env nécessaire au bon fonctionnement de l'API (le script va uniquement paramétrer la variable d'environnement DATABASE_URL nécessaire pour la connexion à la base de données):

```bash
node setup-env.js
```

Puis vous pouvez exécuter les commandes suivantes pour démarrer le projet (à noter que `pnpm seed` est utile si vous voulez remplir la base de données pour tester l'API, mais il ne s'agit pas d'une commande obligatoire.)

```bash
docker-compose up
pnpm install
npx prisma generate
npx prisma migrate dev
pnpm seed
pnpm start
```

Le serveur démarre sur le port 8000.

## Documentation Swagger

Une fois l'API démarrée, vous pouvez vous rendre à l'adresse http://localhost:8000/api-docs/ pour accéder à la documentation Swagger qui vous permet de tester chaque endpoint et visualiser les endpoints, DTO et schémas utilisés.

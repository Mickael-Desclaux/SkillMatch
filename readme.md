# Skill Match API

API de matching entre freelances et projets basée sur les compétences et le taux journalier.

## Configuration

**Port**: 8000
**Base URL**: `http://localhost:8000`

## Endpoints

### Freelances

#### `GET /freelances`

Récupère tous les freelances ou filtre par compétence.

**Query Parameters**:

- `skill` (optionnel): Filtre les freelances par compétence

**Réponses**:

- `200`: Liste des freelances
- `404`: Aucun freelance trouvé

**Exemple**:

```bash
GET /freelances
GET /freelances?skill=react
```

---

#### `GET /freelances/:id`

Récupère un freelance par son ID.

**Paramètres**:

- `id`: ID du freelance

**Réponses**:

- `200`: Détails du freelance
- `404`: Freelance non trouvé

**Exemple**:

```bash
GET /freelances/1
```

---

#### `POST /freelances`

Crée un nouveau freelance.

**Body** (JSON):

```json
{
  "name": "string",
  "email": "string",
  "skills": ["string"],
  "dailyRate": number
}
```

**Réponses**:

- `201`: Freelance créé avec succès
- `409`: Un compte existe déjà avec cet email

**Exemple**:

```bash
POST /freelances
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "skills": ["react", "node.js"],
  "dailyRate": 500
}
```

---

#### `GET /freelances/:id/matchingProjects`

Récupère tous les projets compatibles avec le profil du freelance.

**Paramètres**:

- `id`: ID du freelance

**Réponses**:

- `200`: Liste des projets compatibles avec le freelance
- `404`: Freelance non trouvé ou aucun projet compatible

**Exemple**:

```bash
GET /freelances/1/matchingProjects
```

---

#### `POST /freelances/:id/apply/:projectId`

Permet à un freelance de postuler à un projet.

**Paramètres**:

- `id`: ID du freelance
- `projectId`: ID du projet

**Réponses**:

- `201`: Postulation réussie
- `401`: Le projet ne correspond pas au profil
- `404`: Freelance ou projet non trouvé
- `409`: Projet déjà assigné ou freelance déjà assigné à ce projet

**Exemple**:

```bash
POST /freelances/1/apply/5
```

---

### Companies

#### `GET /companies`

Récupère toutes les entreprises.

**Réponses**:

- `200`: Liste des entreprises
- `404`: Aucune entreprise trouvée

**Exemple**:

```bash
GET /companies
```

---

#### `GET /companies/:id`

Récupère une entreprise par son ID.

**Paramètres**:

- `id`: ID de l'entreprise

**Réponses**:

- `200`: Détails de l'entreprise
- `404`: Entreprise non trouvée

**Exemple**:

```bash
GET /companies/1
```

---

#### `POST /companies`

Crée une nouvelle entreprise.

**Body** (JSON):

```json
{
	"name": "string",
	"industry": "string"
}
```

**Réponses**:

- `201`: Entreprise créée avec succès

**Exemple**:

```bash
POST /companies
Content-Type: application/json

{
  "name": "Tech Corp",
  "industry": "Technology"
}
```

---

#### `GET /companies/:id/projects`

Récupère tous les projets d'une entreprise.

**Paramètres**:

- `id`: ID de l'entreprise

**Réponses**:

- `200`: Liste des projets
- `404`: Entreprise non trouvée ou aucun projet trouvé

**Exemple**:

```bash
GET /companies/1/projects
```

---

#### `POST /companies/:id/projects`

Crée un nouveau projet pour une entreprise.

**Paramètres**:

- `id`: ID de l'entreprise

**Body** (JSON):

```json
{
  "title": "string",
  "description": "string",
  "requestedSkills": ["string"],
  "maxDailyRate": number
}
```

**Réponses**:

- `201`: Projet créé avec succès
- `404`: Entreprise non trouvée

**Exemple**:

```bash
POST /companies/1/projects
Content-Type: application/json

{
  "title": "E-commerce Platform",
  "description": "Build a modern e-commerce platform",
  "requestedSkills": ["react", "node.js", "postgresql"],
  "maxDailyRate": 600
}
```

---

#### `GET /companies/:id/projects/:projectId/matchingCandidates`

Récupère tous les candidats compatibles pour un projet spécifique.

**Paramètres**:

- `id`: ID de l'entreprise
- `projectId`: ID du projet

**Réponses**:

- `200`: Liste des candidats matchants
- `404`: Entreprise, projet non trouvé ou aucun candidat compatible

**Exemple**:

```bash
GET /companies/1/projects/5/matchingCandidates
```

---

### Projects

#### `GET /projects/open`

Récupère tous les projets disponibles (non assignés).

**Réponses**:

- `200`: Liste des projets ouverts
- `404`: Aucun projet disponible

**Exemple**:

```bash
GET /projects/open
```

---

#### `GET /projects/:id/candidatesWithScore`

Récupère tous les candidats pour un projet avec leur score de matching (trié par score décroissant).

**Paramètres**:

- `id`: ID du projet

**Réponses**:

- `200`: Liste des candidats triés par pertinence
- `404`: Projet non trouvé ou aucun candidat

**Exemple**:

```bash
GET /projects/1/candidatesWithScore
```

---

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

```bash
pnpm install
pnpm start
```

Le serveur démarre sur le port 8000.

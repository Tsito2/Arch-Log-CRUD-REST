# Restaurant API - README

## Structure du projet

```
Proj/
│
├── node_modules/               # Modules npm installés
├── src/                        # Code source de l'application
│   ├── models/                 # Logique des modèles et des requêtes SQL
│   │   ├── index.js            # Connexion à la base de données MySQL
│   │   ├── order.js            # Gestion des commandes
│   │   └── simulation.js       # Gestion des simulations
│   ├── routes/                 # Définition des routes API
│   │   ├── orders.js           # Routes pour gérer les commandes
│   │   └── simulations.js      # Routes pour gérer les simulations
│   ├── app.js                  # Point d'entrée de l'application Express
│   └── config.js               # Configuration de l'API (configurations de port, etc.)
│
├── .env                        # Variables d'environnement (connexion à la base de données, etc.)
├── bdd.sql                     # Script SQL pour créer les tables et insérer des données de test
├── package.json                # Dépendances et scripts du projet
├── package-lock.json           # Verrouillage des versions des dépendances
├── README.md                   # Documentation du projet (ce fichier)
└── server.js                   # Point d'entrée de l'application (démarre le serveur)
```

---

## Explication des fichiers

### 1. **`src/models/index.js`**

Ce fichier contient la configuration pour se connecter à la base de données MySQL. Utilise les variables définies dans `.env` pour se connecter à la base de données.

### 2. **`src/models/order.js`**

Ce fichier gère la logique des commandes. Il contient des fonctions permettant de créer, récupérer, mettre à jour et supprimer des commandes dans la base de données. Les articles de commande sont désormais directement intégrés dans la table `order` plutôt que dans une table séparée.

### 3. **`src/models/simulation.js`**

Ce fichier gère la logique des simulations. Il contient des fonctions pour créer, récupérer, mettre à jour et supprimer des simulations. Les simulations sont associées aux commandes pour déterminer les différentes étapes de préparation et de livraison.

### 4. **`src/routes/orders.js`**

Définit les routes pour gérer les commandes :
- **POST `/api/orders`** : Crée une nouvelle commande avec des articles intégrés.
- **GET `/api/orders`** : Récupère toutes les commandes avec leurs articles associés.
- **PUT `/api/orders/:id`** : Met à jour une commande existante.
- **DELETE `/api/orders/:id`** : Supprime une commande.

### 5. **`src/routes/simulations.js`**

Définit les routes pour gérer les simulations :
- **POST `/api/simulations`** : Crée une nouvelle simulation pour une commande.
- **GET `/api/simulations`** : Récupère toutes les simulations.
- **PUT `/api/simulations/:id`** : Met à jour une simulation existante.
- **DELETE `/api/simulations/:id`** : Supprime une simulation.

### 6. **`src/app.js`**

Ce fichier sert de point d'entrée pour la configuration des routes dans Express. Il importe toutes les routes nécessaires et configure l'application Express pour les utiliser.

### 7. **`src/config.js`**

Ce fichier contient les configurations de l'API, comme la configuration du port et d'autres paramètres nécessaires à l'exécution de l'application.

### 8. **`.env`**

Ce fichier contient les variables d'environnement nécessaires pour la connexion à la base de données (par exemple, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`). Il permet de garder les informations sensibles en dehors du code source.

### 9. **`bdd.sql`**

Contient le script SQL pour créer les tables dans la base de données MySQL, ainsi que pour insérer des données de test dans la table `orders` et `simulations`.

### 10. **`package.json`**

Ce fichier gère les dépendances et les scripts du projet. Il est utilisé pour installer les bibliothèques nécessaires (par exemple, Express, dotenv, MySQL) et pour exécuter les scripts (démarrage du serveur, tests, etc.).

### 11. **`server.js`**

Ce fichier est le point d'entrée de l'application. Il configure Express et démarre le serveur, en chargeant les routes et en écoutant sur le port défini.

### 12. **`tests_postman.json`**

Ce fichier contient toutes les requêtes à exécuter sur Postman afin de tester le bon fonctionnement des routes, notamment la gestion des commandes, des articles dans les commandes et des simulations.

---

## Explication des entrées attendues

### 1. **POST `/api/orders`**

Lors de la création d'une commande, le corps de la requête (`body`) doit inclure les informations suivantes :

```json
{
  "customerName": "John Doe",
  "simulationId": "sim123",
  "arrivalDateTime": "2025-01-15 08:00:00",
  "cookStartDateTime": "2025-01-15 08:30:00",
  "cookEndDateTime": "2025-01-15 09:00:00",
  "cookBy": "Chef 1",
  "deliverStartDateTime": "2025-01-15 09:10:00",
  "deliverEndDateTime": "2025-01-15 09:30:00",
  "deliverBy": "Driver 1",
  "status": "pending"
}
```

### 2. **POST `/api/simulations`**

Lors de la création d'une simulation, le corps de la requête doit inclure les informations suivantes :

```json
{
  "simulationName": "Sim1",
  "description": "Simulation de test pour une commande"
}
```

### 3. **PUT `/api/orders/:id`**

Lors de la mise à jour d'une commande, le corps de la requête doit être similaire à celui de la création d'une commande, mais avec un identifiant `id` dans l'URL pour cibler la commande à mettre à jour.

### 4. **PUT `/api/simulations/:id`**

Lors de la mise à jour d'une simulation, le corps de la requête doit être similaire à celui de la création d'une simulation, mais avec un identifiant `id` dans l'URL pour cibler la simulation à mettre à jour.

### 5. **DELETE `/api/orders/:id`**

Pour supprimer une commande, il suffit de spécifier l'ID de la commande dans l'URL. Aucune donnée dans le corps de la requête n'est nécessaire.

### 6. **DELETE `/api/simulations/:id`**

Pour supprimer une simulation, il suffit de spécifier l'ID de la simulation dans l'URL. Aucune donnée dans le corps de la requête n'est nécessaire.

---

## Schéma de la Base de Données

La base de données contient deux tables principales : `orders` et `simulations`.

### Table `orders`

| Colonne              | Type             | Description                               |
|----------------------|------------------|-------------------------------------------|
| `id`                 | `int`            | Identifiant unique de la commande (clé primaire). |
| `customerName`       | `varchar(255)`    | Nom du client ayant passé la commande.    |
| `simulationId`       | `varchar(255)`    | Identifiant de la simulation associée.    |
| `arrivalDateTime`    | `datetime`       | Heure d'arrivée de la commande.           |
| `cookStartDateTime`  | `datetime`       | Heure de début de la préparation.         |
| `cookEndDateTime`    | `datetime`       | Heure de fin de la préparation.           |
| `cookBy`             | `varchar(255)`    | Chef responsable de la préparation.       |
| `deliverStartDateTime`| `datetime`      | Heure de début de la livraison.           |
| `deliverEndDateTime` | `datetime`       | Heure de fin de la livraison.             |
| `deliverBy`          | `varchar(255)`    | Livreur responsable de la livraison.      |
| `status`             | `varchar(255)`    | Statut actuel de la commande (`pending`, `completed`, etc.). |

### Table `simulations`

| Colonne              | Type             | Description                               |
|----------------------|------------------|-------------------------------------------|
| `id`                 | `int`            | Identifiant unique de la simulation (clé primaire). |
| `simulationName`     | `varchar(255)`    | Nom de la simulation.                    |
| `description`        | `text`           | Description de la simulation.            |

---

## Installation

1. **Cloner le projet** :
   ```bash
   git clone <url_du_projet>
   ```

2. **Installer les dépendances** :
   ```bash
   cd <dossier_du_projet>
   npm install
   ```

3. **Configurer la base de données** :
  - Ouvrez `bdd.sql` et exécutez le script dans votre base de données MySQL.
  - Configurez les variables dans le fichier `.env`.

4. **Démarrer l'application** :
   ```bash
   npm start
   ```

---

## Tests avec Postman

Importez le fichier `tests_postman.json` dans Postman pour tester toutes les routes définies. Assurez-vous que l'API est en cours d'exécution avant de procéder.

---
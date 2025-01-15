# Restaurant API - README

## Structure du projet

```
Proj/
│
├── node_modules/               # Modules npm installés
├── src/                        # Code source de l'application
│   ├── models/                 # Logique des modèles et des requêtes SQL
│   │   ├── index.js            # Connexion à la base de données MySQL
│   │   ├── order-items.js      # Gestion des articles de commande
│   │   └── order.js            # Gestion des commandes
│   ├── routes/                 # Définition des routes API
│   │   ├── order-items.js      # Routes pour gérer les articles de commande
│   │   ├── orders.js           # Routes pour gérer les commandes
│   │   ├── app.js              # Point d'entrée de l'application Express
│   │   └── config.js           # Configuration de l'API (configurations de port, etc.)
│
├── .env                        # Variables d'environnement (connexion à la base de données, etc.)
├── bdd.sql                     # Script SQL pour créer les tables et insérer des données de test
├── package.json                # Dépendances et scripts du projet
├── package-lock.json           # Verrouillage des versions des dépendances
├── README.rd                   # Documentation du projet (ce fichier)
└── server.js                   # Point d'entrée de l'application (démarre le serveur)
```

---

## Explication des fichiers

### 1. **`src/models/index.js`**

Ce fichier contient la configuration pour se connecter à la base de données MySQL. Utilise les variables définies dans `.env` pour se connecter à la base de données.

### 2. **`src/models/order-items.js`**

Ce fichier gère la logique des articles de commande. Il contient des fonctions permettant d'ajouter, mettre à jour et supprimer des articles de commande dans la base de données.

### 3. **`src/models/order.js`**

Ce fichier gère la logique des commandes. Il contient des fonctions permettant de créer, récupérer, mettre à jour et supprimer des commandes dans la base de données, ainsi que d'ajouter ou de supprimer des articles dans les commandes.

### 4. **`src/routes/order-items.js`**

Définit les routes pour interagir avec les articles de commande :
- **POST `/api/order-items`** : Crée un nouvel article dans une commande.
- **GET `/api/order-items`** : Récupère tous les articles de commande.
- **PUT `/api/order-items/:id`** : Met à jour un article dans une commande.
- **DELETE `/api/order-items/:id`** : Supprime un article d'une commande.

### 5. **`src/routes/orders.js`**

Définit les routes pour gérer les commandes :
- **POST `/api/orders`** : Crée une nouvelle commande avec des articles.
- **GET `/api/orders`** : Récupère toutes les commandes.
- **PUT `/api/orders/:id`** : Met à jour une commande existante.
- **DELETE `/api/orders/:id`** : Supprime une commande.

### 6. **`src/routes/app.js`**

Ce fichier sert de point d'entrée pour la configuration des routes dans Express. Il importe toutes les routes nécessaires (commandes et articles) et configure l'application Express pour les utiliser.

### 7. **`src/routes/config.js`**

Ce fichier contient les configurations de l'API, comme la configuration du port et d'autres paramètres nécessaires à l'exécution de l'application.

### 8. **`.env`**

Ce fichier contient les variables d'environnement nécessaires pour la connexion à la base de données (par exemple, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`). Il permet de garder les informations sensibles en dehors du code source.

### 9. **`bdd.sql`**

Contient le script SQL pour créer les tables dans la base de données MySQL, ainsi que pour insérer des données de test dans les tables `orders` et `order_items`.

### 10. **`package.json`**

Ce fichier gère les dépendances et les scripts du projet. Il est utilisé pour installer les bibliothèques nécessaires (par exemple, Express, dotenv, MySQL) et pour exécuter les scripts (démarrage du serveur, tests, etc.).

### 11. **`server.js`**

Ce fichier est le point d'entrée de l'application. Il configure Express et démarre le serveur, en chargeant les routes et en écoutant sur le port défini.

---

## Explication des entrées attendues

### 1. **POST `/api/orders`**

Lors de la création d'une commande, le corps de la requête (`body`) doit inclure les informations suivantes :

```json
{
  "customerName": "John Doe",
  "items": [
    { "name": "Pizza", "quantity": 2 },
    { "name": "Pasta", "quantity": 1 }
  ],
  "status": "pending"
}
```

- `customerName` (obligatoire) : Nom du client pour la commande.
- `items` (obligatoire) : Liste des articles de la commande, chaque article contenant :
  - `name` (obligatoire) : Nom de l'article.
  - `quantity` (obligatoire) : Quantité de cet article.
- `status` (obligatoire) : Statut de la commande (ex : `pending`, `completed`).

### 2. **PUT `/api/orders/:id`**

Lors de la mise à jour d'une commande, le corps de la requête doit être similaire à celui de la création d'une commande, mais avec un identifiant `id` dans l'URL pour cibler la commande à mettre à jour.

```json
{
  "customerName": "Jane Doe",
  "items": [
    { "name": "Pizza", "quantity": 3 },
    { "name": "Salad", "quantity": 1 }
  ],
  "status": "completed"
}
```

- `id` dans l'URL : ID de la commande à mettre à jour.
- Les mêmes champs que pour le POST (`customerName`, `items`, `status`).

### 3. **DELETE `/api/orders/:id`**

Pour supprimer une commande, il suffit de spécifier l'ID de la commande dans l'URL. Aucune donnée dans le corps de la requête n'est nécessaire.

---

## Explication des Endpoints

### 1. **POST `/api/orders`**

**Description** : Crée une nouvelle commande. Cette commande va ajouter à la fois l'entrée dans la table `orders` (pour la commande elle-même) et dans la table `order_items` (pour les articles de la commande).

**Exemple** : 
```bash
POST http://localhost:3000/api/orders
```

**Réponse** (si réussi) :
```json
{
  "id": 4,
  "customerName": "John Doe",
  "items": [
    { "name": "Pizza", "quantity": 2 },
    { "name": "Pasta", "quantity": 1 }
  ],
  "status": "pending"
}
```

**Erreur possible** : Si les champs `customerName`, `items` ou `status` sont manquants dans le corps de la requête, une erreur 400 sera renvoyée avec un message d'erreur approprié.

---

### 2. **GET `/api/orders`**

**Description** : Récupère toutes les commandes existantes. Chaque commande inclura son `id`, `customerName`, `status`, et ses items associés.

**Exemple** : 
```bash
GET http://localhost:3000/api/orders
```

**Réponse** :
```json
[
  {
    "id": 1,
    "customerName": "Testeur",
    "status": "pending",
    "createdAt": "2025-01-15T08:25:26Z",
    "items": [
      { "name": "Pizza", "quantity": 3 },
      { "name": "Salad", "quantity": 1 }
    ]
  }
]
```

---

### 3. **PUT `/api/orders/:id`**

**Description** : Met à jour une commande existante, spécifiée par son `id` dans l'URL.

**Exemple** : 
```bash
PUT http://localhost:3000/api/orders/1
```

**Corps de la requête** :
```json
{
  "customerName": "Jane Doe",
  "items": [
    { "name": "Pizza", "quantity": 3 },
    { "name": "Salad", "quantity": 1 }
  ],
  "status": "completed"
}
```

**Réponse** :
```json
{
  "id": 1,
  "customerName": "Jane Doe",
  "items": [
    { "name": "Pizza", "quantity": 3 },
    { "name": "Salad", "quantity": 1 }
  ],
  "status": "completed"
}
```

---

### 4. **DELETE `/api/orders/:id`**

**Description** : Supprime une commande spécifiée par son `id` dans l'URL.

**Exemple** :
```bash
DELETE http://localhost:3000/api/orders/1
```

**Réponse** :
```json
{
  "message": "Commande supprimée avec succès."
}
```

---
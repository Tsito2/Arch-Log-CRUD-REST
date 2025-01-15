-- Base de données : `restaurant`

-- --------------------------------------------------------

-- Structure de la table `orders`
DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
                                        `id` int NOT NULL AUTO_INCREMENT,
                                        `customerName` varchar(255) NOT NULL,
    `status` varchar(50) DEFAULT 'pending',
    `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
    ) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

-- Structure de la table `order_items`
DROP TABLE IF EXISTS `order_items`;
CREATE TABLE IF NOT EXISTS `order_items` (
                                             `id` int NOT NULL AUTO_INCREMENT,
                                             `order_id` int DEFAULT NULL,
                                             `name` varchar(255) DEFAULT NULL,
    `quantity` int DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `order_id` (`order_id`)
    ) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

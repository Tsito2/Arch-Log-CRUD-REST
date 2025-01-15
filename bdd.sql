-- Structure de la table `orders`
CREATE TABLE IF NOT EXISTS `orders` (
                                        `id` int NOT NULL AUTO_INCREMENT,
                                        `simulationId` varchar(255) NOT NULL,
    `name` varchar(255) NOT NULL,
    `arrivalDateTime` timestamp NULL DEFAULT NULL,
    `cookStartDateTime` timestamp NULL DEFAULT NULL,
    `cookEndDateTime` timestamp NULL DEFAULT NULL,
    `cookBy` varchar(255) NOT NULL,
    `deliverStartDateTime` timestamp NULL DEFAULT NULL,
    `deliverEndDateTime` timestamp NULL DEFAULT NULL,
    `deliverBy` varchar(255) NOT NULL,
    `createdDateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `simulationId` (`simulationId`(250))
    ) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Structure de la table `simulation`
CREATE TABLE IF NOT EXISTS `simulation` (
                                            `id` varchar(255) NOT NULL,
    `ordersCountMin` int NOT NULL,
    `ordersCountMax` int NOT NULL,
    `startDateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    `endDateTime` timestamp NULL DEFAULT NULL,
    `duration` int NOT NULL,
    `createdDateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
    ) ENGINE=MyISAM DEFAULT CHARSET=utf8mb3;

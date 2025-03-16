CREATE DATABASE IF NOT EXISTS `restside` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;  
USE `restside`;
-- Table `simulation`
CREATE TABLE IF NOT EXISTS `simulation` (
    `id` VARCHAR(255) NOT NULL,
    `ordersCountMin` INT NOT NULL,
    `ordersCountMax` INT NOT NULL,
    `startDateTime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    `endDateTime` TIMESTAMP NULL DEFAULT NULL,
    `duration` INT NOT NULL,
    `createdDateTime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table `orders`
CREATE TABLE IF NOT EXISTS `orders` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `simulationId` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `arrivalDateTime` TIMESTAMP NULL DEFAULT NULL,
    `cookStartDateTime` TIMESTAMP NULL DEFAULT NULL,
    `cookEndDateTime` TIMESTAMP NULL DEFAULT NULL,
    `cookBy` VARCHAR(255) NOT NULL,
    `deliverStartDateTime` TIMESTAMP NULL DEFAULT NULL,
    `deliverEndDateTime` TIMESTAMP NULL DEFAULT NULL,
    `deliverBy` VARCHAR(255) NULL DEFAULT NULL,
    `createdDateTime` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_simulationId` (`simulationId`),
    CONSTRAINT `fk_orders_simulation`
    FOREIGN KEY (`simulationId`) REFERENCES `simulation` (`id`)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
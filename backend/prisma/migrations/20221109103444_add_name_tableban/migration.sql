-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(255) NULL,
    `password` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tableban` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `driverId` INTEGER NOT NULL,
    `carNumber` INTEGER NOT NULL,
    `dateChange` DATE NOT NULL,
    `merkBan` VARCHAR(255) NULL,
    `kmNew` FLOAT NOT NULL,
    `kmOld` FLOAT NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `carNumber`(`carNumber`),
    INDEX `driverId`(`driverId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tabledriver` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(255) NOT NULL,
    `ktp` VARCHAR(255) NULL,
    `phoneNumber` VARCHAR(255) NULL,
    `bankAccountName` VARCHAR(40) NULL,
    `bankAccountNumber` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tablekendaraan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `carType` VARCHAR(255) NULL,
    `noPlat` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tablekinerja` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `driverId` INTEGER NOT NULL,
    `dateLoad` DATE NOT NULL,
    `noDo` INTEGER NULL,
    `carNumber` INTEGER NOT NULL,
    `totalTon` INTEGER NOT NULL,
    `uangJalan` INTEGER NULL,
    `productOrigin` VARCHAR(255) NULL,
    `productCode` VARCHAR(255) NULL,
    `transMitra` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `carNumber`(`carNumber`),
    INDEX `driverId`(`driverId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tableper` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `driverId` INTEGER NOT NULL,
    `carNumber` INTEGER NOT NULL,
    `dateChange` DATE NOT NULL,
    `kodePer` VARCHAR(255) NULL,
    `jenisPer` VARCHAR(255) NULL,
    `bagian` VARCHAR(255) NULL,
    `kmNew` FLOAT NOT NULL,
    `kmOld` FLOAT NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `carNumber`(`carNumber`),
    INDEX `driverId`(`driverId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tablesolar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `driverId` INTEGER NOT NULL,
    `carNumber` INTEGER NOT NULL,
    `rit` VARCHAR(255) NULL,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `solarRest` VARCHAR(255) NOT NULL,
    `price` VARCHAR(255) NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `deleted_at` TIMESTAMP(0) NULL,

    INDEX `carNumber`(`carNumber`),
    INDEX `driverId`(`driverId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tableban` ADD CONSTRAINT `tableban_ibfk_1` FOREIGN KEY (`driverId`) REFERENCES `tabledriver`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tableban` ADD CONSTRAINT `tableban_ibfk_2` FOREIGN KEY (`carNumber`) REFERENCES `tablekendaraan`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tablekinerja` ADD CONSTRAINT `tablekinerja_ibfk_1` FOREIGN KEY (`driverId`) REFERENCES `tabledriver`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tablekinerja` ADD CONSTRAINT `tablekinerja_ibfk_2` FOREIGN KEY (`carNumber`) REFERENCES `tablekendaraan`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tableper` ADD CONSTRAINT `tableper_ibfk_1` FOREIGN KEY (`driverId`) REFERENCES `tabledriver`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tableper` ADD CONSTRAINT `tableper_ibfk_2` FOREIGN KEY (`carNumber`) REFERENCES `tablekendaraan`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tablesolar` ADD CONSTRAINT `tablesolar_ibfk_1` FOREIGN KEY (`driverId`) REFERENCES `tabledriver`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tablesolar` ADD CONSTRAINT `tablesolar_ibfk_2` FOREIGN KEY (`carNumber`) REFERENCES `tablekendaraan`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

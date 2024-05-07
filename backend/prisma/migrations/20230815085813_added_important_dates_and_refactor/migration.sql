/*
  Warnings:

  - You are about to drop the column `showPromotions` on the `page` table. All the data in the column will be lost.
  - You are about to drop the `promotion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Promotion` DROP FOREIGN KEY `Promotion_pageName_fkey`;

-- DropForeignKey
ALTER TABLE `Promotion` DROP FOREIGN KEY `Promotion_promotedPageName_fkey`;

-- AlterTable
ALTER TABLE `Page` DROP COLUMN `showPromotions`,
    ADD COLUMN `showImportantDatesBlock` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `showPromotionsBlock` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `Promotion`;

-- CreateTable
CREATE TABLE `PromotionsBlock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pageName` VARCHAR(191) NOT NULL,
    `promotedPageName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImportantDatesBlock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pageName` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PromotionsBlock` ADD CONSTRAINT `PromotionsBlock_pageName_fkey` FOREIGN KEY (`pageName`) REFERENCES `Page`(`pageName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PromotionsBlock` ADD CONSTRAINT `PromotionsBlock_promotedPageName_fkey` FOREIGN KEY (`promotedPageName`) REFERENCES `Page`(`pageName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImportantDatesBlock` ADD CONSTRAINT `ImportantDatesBlock_pageName_fkey` FOREIGN KEY (`pageName`) REFERENCES `Page`(`pageName`) ON DELETE RESTRICT ON UPDATE CASCADE;

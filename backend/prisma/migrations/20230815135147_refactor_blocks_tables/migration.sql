/*
  Warnings:

  - You are about to drop the column `date` on the `importantdatesblock` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `importantdatesblock` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `importantdatesblock` table. All the data in the column will be lost.
  - You are about to drop the column `showImportantDatesBlock` on the `page` table. All the data in the column will be lost.
  - You are about to drop the column `showMapBlock` on the `page` table. All the data in the column will be lost.
  - You are about to drop the column `showPromotionsBlock` on the `page` table. All the data in the column will be lost.
  - You are about to drop the column `promotedPageName` on the `promotionsblock` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,pageName]` on the table `ImportantDatesBlock` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,pageName]` on the table `PromotionsBlock` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `PromotionsBlock` DROP FOREIGN KEY `PromotionsBlock_promotedPageName_fkey`;

-- AlterTable
ALTER TABLE `ImportantDatesBlock` DROP COLUMN `date`,
    DROP COLUMN `text`,
    DROP COLUMN `url`,
    ADD COLUMN `showBlock` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `MapBlock` ADD COLUMN `showBlock` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Page` DROP COLUMN `showImportantDatesBlock`,
    DROP COLUMN `showMapBlock`,
    DROP COLUMN `showPromotionsBlock`;

-- AlterTable
ALTER TABLE `PromotionsBlock` DROP COLUMN `promotedPageName`,
    ADD COLUMN `showBlock` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `PromotionsBlockPromotions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `blockId` INTEGER NOT NULL,
    `pageName` VARCHAR(191) NOT NULL,
    `promotedPageName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImportantDatesBlockDateCards` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pageName` VARCHAR(191) NOT NULL,
    `blockId` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `ImportantDatesBlock_id_pageName_key` ON `ImportantDatesBlock`(`id`, `pageName`);

-- CreateIndex
CREATE UNIQUE INDEX `PromotionsBlock_id_pageName_key` ON `PromotionsBlock`(`id`, `pageName`);

-- AddForeignKey
ALTER TABLE `PromotionsBlockPromotions` ADD CONSTRAINT `PromotionsBlockPromotions_blockId_pageName_fkey` FOREIGN KEY (`blockId`, `pageName`) REFERENCES `PromotionsBlock`(`id`, `pageName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PromotionsBlockPromotions` ADD CONSTRAINT `PromotionsBlockPromotions_promotedPageName_fkey` FOREIGN KEY (`promotedPageName`) REFERENCES `Page`(`pageName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImportantDatesBlockDateCards` ADD CONSTRAINT `ImportantDatesBlockDateCards_blockId_pageName_fkey` FOREIGN KEY (`blockId`, `pageName`) REFERENCES `ImportantDatesBlock`(`id`, `pageName`) ON DELETE RESTRICT ON UPDATE CASCADE;

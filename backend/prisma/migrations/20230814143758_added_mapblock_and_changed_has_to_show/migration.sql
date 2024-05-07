/*
  Warnings:

  - You are about to drop the column `hasPromotions` on the `page` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Page` DROP COLUMN `hasPromotions`,
    ADD COLUMN `showMapBlock` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `showPromotions` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `MapBlock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pageName` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `buttonText` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MapBlock` ADD CONSTRAINT `MapBlock_pageName_fkey` FOREIGN KEY (`pageName`) REFERENCES `Page`(`pageName`) ON DELETE RESTRICT ON UPDATE CASCADE;

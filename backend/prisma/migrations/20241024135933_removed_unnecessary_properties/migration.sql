/*
  Warnings:

  - You are about to drop the column `pageId` on the `EmployerPromotionsBlock` table. All the data in the column will be lost.
  - You are about to drop the column `pageName` on the `EmployerPromotionsBlock` table. All the data in the column will be lost.
  - You are about to drop the column `pageId` on the `EmployerPromotionsBlockPromotions` table. All the data in the column will be lost.
  - You are about to drop the column `pageName` on the `EmployerPromotionsBlockPromotions` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `EmployerPromotionsBlock` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `EmployerPromotionsBlockPromotions` DROP FOREIGN KEY `EmployerPromotionsBlockPromotions_blockId_pageName_pageId_fkey`;

-- DropIndex
DROP INDEX `EmployerPromotionsBlock_id_pageName_pageId_key` ON `EmployerPromotionsBlock`;

-- AlterTable
ALTER TABLE `EmployerPromotionsBlock` DROP COLUMN `pageId`,
    DROP COLUMN `pageName`;

-- AlterTable
ALTER TABLE `EmployerPromotionsBlockPromotions` DROP COLUMN `pageId`,
    DROP COLUMN `pageName`;

-- CreateIndex
CREATE UNIQUE INDEX `EmployerPromotionsBlock_id_key` ON `EmployerPromotionsBlock`(`id`);

-- AddForeignKey
ALTER TABLE `EmployerPromotionsBlockPromotions` ADD CONSTRAINT `EmployerPromotionsBlockPromotions_blockId_fkey` FOREIGN KEY (`blockId`) REFERENCES `EmployerPromotionsBlock`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

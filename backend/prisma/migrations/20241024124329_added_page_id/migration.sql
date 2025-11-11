/*
  Warnings:

  - The primary key for the `EditRolesOnPage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id,pageName,pageId]` on the table `EmployerPromotionsBlock` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,pageName,pageId]` on the table `FaqBlock` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,pageName,pageId]` on the table `ImportantDatesBlock` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,pageName,pageId]` on the table `LogosBlock` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,pageName,pageId]` on the table `PromotionsBlock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pageId` to the `EditRolesOnPage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageId` to the `EmployerPromotionsBlock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageId` to the `EmployerPromotionsBlockPromotions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageId` to the `FaqBlock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageId` to the `FaqBlockQuestions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageId` to the `ImportantDatesBlock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageId` to the `ImportantDatesBlockDateCards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageId` to the `LogosBlock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageId` to the `LogosBlockLogos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageId` to the `MapBlock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageId` to the `PromotionsBlock` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pageId` to the `PromotionsBlockPromotions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `promotedPageId` to the `PromotionsBlockPromotions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `EditRolesOnPage` DROP FOREIGN KEY `EditRolesOnPage_pageName_fkey`;

-- DropForeignKey
ALTER TABLE `EmployerPromotionsBlockPromotions` DROP FOREIGN KEY `EmployerPromotionsBlockPromotions_blockId_pageName_fkey`;

-- DropForeignKey
ALTER TABLE `FaqBlock` DROP FOREIGN KEY `FaqBlock_pageName_fkey`;

-- DropForeignKey
ALTER TABLE `FaqBlockQuestions` DROP FOREIGN KEY `FaqBlockQuestions_blockId_pageName_fkey`;

-- DropForeignKey
ALTER TABLE `ImportantDatesBlock` DROP FOREIGN KEY `ImportantDatesBlock_pageName_fkey`;

-- DropForeignKey
ALTER TABLE `ImportantDatesBlockDateCards` DROP FOREIGN KEY `ImportantDatesBlockDateCards_blockId_pageName_fkey`;

-- DropForeignKey
ALTER TABLE `LogosBlock` DROP FOREIGN KEY `LogosBlock_pageName_fkey`;

-- DropForeignKey
ALTER TABLE `LogosBlockLogos` DROP FOREIGN KEY `LogosBlockLogos_blockId_pageName_fkey`;

-- DropForeignKey
ALTER TABLE `MapBlock` DROP FOREIGN KEY `MapBlock_pageName_fkey`;

-- DropForeignKey
ALTER TABLE `PromotionsBlock` DROP FOREIGN KEY `PromotionsBlock_pageName_fkey`;

-- DropForeignKey
ALTER TABLE `PromotionsBlockPromotions` DROP FOREIGN KEY `PromotionsBlockPromotions_blockId_pageName_fkey`;

-- DropForeignKey
ALTER TABLE `PromotionsBlockPromotions` DROP FOREIGN KEY `PromotionsBlockPromotions_promotedPageName_fkey`;

-- DropIndex
DROP INDEX `EmployerPromotionsBlock_id_pageName_key` ON `EmployerPromotionsBlock`;

-- DropIndex
DROP INDEX `FaqBlock_id_pageName_key` ON `FaqBlock`;

-- DropIndex
DROP INDEX `ImportantDatesBlock_id_pageName_key` ON `ImportantDatesBlock`;

-- DropIndex
DROP INDEX `LogosBlock_id_pageName_key` ON `LogosBlock`;

-- DropIndex
DROP INDEX `PromotionsBlock_id_pageName_key` ON `PromotionsBlock`;

-- AlterTable
ALTER TABLE `EditRolesOnPage` DROP PRIMARY KEY,
    ADD COLUMN `pageId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`pageName`, `pageId`, `role`);

-- AlterTable
ALTER TABLE `EmployerPromotionsBlock` ADD COLUMN `pageId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `EmployerPromotionsBlockPromotions` ADD COLUMN `pageId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `FaqBlock` ADD COLUMN `pageId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `FaqBlockQuestions` ADD COLUMN `pageId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ImportantDatesBlock` ADD COLUMN `pageId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `ImportantDatesBlockDateCards` ADD COLUMN `pageId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `LogosBlock` ADD COLUMN `pageId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `LogosBlockLogos` ADD COLUMN `pageId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `MapBlock` ADD COLUMN `pageId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PromotionsBlock` ADD COLUMN `pageId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `PromotionsBlockPromotions` ADD COLUMN `pageId` INTEGER NOT NULL,
    ADD COLUMN `promotedPageId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `EmployerPromotionsBlock_id_pageName_pageId_key` ON `EmployerPromotionsBlock`(`id`, `pageName`, `pageId`);

-- CreateIndex
CREATE UNIQUE INDEX `FaqBlock_id_pageName_pageId_key` ON `FaqBlock`(`id`, `pageName`, `pageId`);

-- CreateIndex
CREATE UNIQUE INDEX `ImportantDatesBlock_id_pageName_pageId_key` ON `ImportantDatesBlock`(`id`, `pageName`, `pageId`);

-- CreateIndex
CREATE UNIQUE INDEX `LogosBlock_id_pageName_pageId_key` ON `LogosBlock`(`id`, `pageName`, `pageId`);

-- CreateIndex
CREATE UNIQUE INDEX `PromotionsBlock_id_pageName_pageId_key` ON `PromotionsBlock`(`id`, `pageName`, `pageId`);

-- AddForeignKey
ALTER TABLE `EditRolesOnPage` ADD CONSTRAINT `EditRolesOnPage_pageName_pageId_fkey` FOREIGN KEY (`pageName`, `pageId`) REFERENCES `Page`(`pageName`, `id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PromotionsBlock` ADD CONSTRAINT `PromotionsBlock_pageName_pageId_fkey` FOREIGN KEY (`pageName`, `pageId`) REFERENCES `Page`(`pageName`, `id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PromotionsBlockPromotions` ADD CONSTRAINT `PromotionsBlockPromotions_blockId_pageName_pageId_fkey` FOREIGN KEY (`blockId`, `pageName`, `pageId`) REFERENCES `PromotionsBlock`(`id`, `pageName`, `pageId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PromotionsBlockPromotions` ADD CONSTRAINT `PromotionsBlockPromotions_promotedPageName_promotedPageId_fkey` FOREIGN KEY (`promotedPageName`, `promotedPageId`) REFERENCES `Page`(`pageName`, `id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployerPromotionsBlockPromotions` ADD CONSTRAINT `EmployerPromotionsBlockPromotions_blockId_pageName_pageId_fkey` FOREIGN KEY (`blockId`, `pageName`, `pageId`) REFERENCES `EmployerPromotionsBlock`(`id`, `pageName`, `pageId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MapBlock` ADD CONSTRAINT `MapBlock_pageName_pageId_fkey` FOREIGN KEY (`pageName`, `pageId`) REFERENCES `Page`(`pageName`, `id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImportantDatesBlock` ADD CONSTRAINT `ImportantDatesBlock_pageName_pageId_fkey` FOREIGN KEY (`pageName`, `pageId`) REFERENCES `Page`(`pageName`, `id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImportantDatesBlockDateCards` ADD CONSTRAINT `ImportantDatesBlockDateCards_blockId_pageName_pageId_fkey` FOREIGN KEY (`blockId`, `pageName`, `pageId`) REFERENCES `ImportantDatesBlock`(`id`, `pageName`, `pageId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FaqBlock` ADD CONSTRAINT `FaqBlock_pageName_pageId_fkey` FOREIGN KEY (`pageName`, `pageId`) REFERENCES `Page`(`pageName`, `id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FaqBlockQuestions` ADD CONSTRAINT `FaqBlockQuestions_blockId_pageName_pageId_fkey` FOREIGN KEY (`blockId`, `pageName`, `pageId`) REFERENCES `FaqBlock`(`id`, `pageName`, `pageId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LogosBlock` ADD CONSTRAINT `LogosBlock_pageName_pageId_fkey` FOREIGN KEY (`pageName`, `pageId`) REFERENCES `Page`(`pageName`, `id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LogosBlockLogos` ADD CONSTRAINT `LogosBlockLogos_blockId_pageName_pageId_fkey` FOREIGN KEY (`blockId`, `pageName`, `pageId`) REFERENCES `LogosBlock`(`id`, `pageName`, `pageId`) ON DELETE CASCADE ON UPDATE CASCADE;

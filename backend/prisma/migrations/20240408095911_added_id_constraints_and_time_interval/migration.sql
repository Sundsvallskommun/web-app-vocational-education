/*
  Warnings:

  - You are about to drop the column `pageName` on the `TableBlockColumnRow` table. All the data in the column will be lost.
  - You are about to drop the column `pageName` on the `TableBlockHeader` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,pageId]` on the table `TableBlock` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id,pageId]` on the table `TableBlockHeader` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pageId` to the `TableBlockColumnRow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `TableBlockColumnRow` DROP FOREIGN KEY `TableBlockColumnRow_headerId_pageName_fkey`;

-- DropForeignKey
ALTER TABLE `TableBlockColumnRow` DROP FOREIGN KEY `TableBlockColumnRow_tableId_pageName_fkey`;

-- DropForeignKey
ALTER TABLE `TableBlockHeader` DROP FOREIGN KEY `TableBlockHeader_tableId_pageName_fkey`;

-- DropIndex
DROP INDEX `TableBlock_id_pageName_key` ON `TableBlock`;

-- DropIndex
DROP INDEX `TableBlockHeader_id_pageName_key` ON `TableBlockHeader`;

-- AlterTable
ALTER TABLE `Media` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `TableBlockColumnRow` DROP COLUMN `pageName`,
    ADD COLUMN `pageId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `TableBlockHeader` DROP COLUMN `pageName`,
    ADD COLUMN `pageId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `User_SavedInterest` ADD COLUMN `timeInterval` VARCHAR(191) NOT NULL DEFAULT '12',
    ADD COLUMN `timeIntervalFrom` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `timeIntervalTo` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX `TableBlock_id_pageId_key` ON `TableBlock`(`id`, `pageId`);

-- CreateIndex
CREATE UNIQUE INDEX `TableBlockHeader_id_pageId_key` ON `TableBlockHeader`(`id`, `pageId`);

-- AddForeignKey
ALTER TABLE `TableBlockHeader` ADD CONSTRAINT `TableBlockHeader_tableId_id_fkey` FOREIGN KEY (`tableId`, `id`) REFERENCES `TableBlock`(`id`, `pageId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TableBlockColumnRow` ADD CONSTRAINT `TableBlockColumnRow_headerId_pageId_fkey` FOREIGN KEY (`headerId`, `pageId`) REFERENCES `TableBlockHeader`(`id`, `pageId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TableBlockColumnRow` ADD CONSTRAINT `TableBlockColumnRow_tableId_id_fkey` FOREIGN KEY (`tableId`, `id`) REFERENCES `TableBlock`(`id`, `pageId`) ON DELETE CASCADE ON UPDATE CASCADE;

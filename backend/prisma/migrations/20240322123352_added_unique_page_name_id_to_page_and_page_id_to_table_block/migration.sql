/*
  Warnings:

  - A unique constraint covering the columns `[id,pageName]` on the table `Page` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `pageId` to the `TableBlock` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `TableBlock` DROP FOREIGN KEY `TableBlock_pageName_fkey`;

-- AlterTable
ALTER TABLE `Media` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `TableBlock` ADD COLUMN `pageId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Page_id_pageName_key` ON `Page`(`id`, `pageName`);

-- AddForeignKey
ALTER TABLE `TableBlock` ADD CONSTRAINT `TableBlock_pageName_pageId_fkey` FOREIGN KEY (`pageName`, `pageId`) REFERENCES `Page`(`pageName`, `id`) ON DELETE CASCADE ON UPDATE CASCADE;

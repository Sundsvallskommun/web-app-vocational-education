/*
  Warnings:

  - You are about to drop the `TableBlockColumnRow` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `TableBlockColumnRow` DROP FOREIGN KEY `TableBlockColumnRow_headerId_pageId_fkey`;

-- DropForeignKey
ALTER TABLE `TableBlockColumnRow` DROP FOREIGN KEY `TableBlockColumnRow_tableId_pageId_fkey`;

-- DropIndex
DROP INDEX `TableBlockHeader_id_pageId_key` ON `TableBlockHeader`;

-- DropTable
DROP TABLE `TableBlockColumnRow`;

-- CreateTable
CREATE TABLE `TableBlockRow` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tableId` INTEGER NOT NULL,
    `pageId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TableBlockCell` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `headerId` INTEGER NOT NULL,
    `rowId` INTEGER NOT NULL,
    `pageId` INTEGER NOT NULL,
    `tableId` INTEGER NOT NULL,
    `wysiwyg_content` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TableBlockRow` ADD CONSTRAINT `TableBlockRow_tableId_pageId_fkey` FOREIGN KEY (`tableId`, `pageId`) REFERENCES `TableBlock`(`id`, `pageId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TableBlockCell` ADD CONSTRAINT `TableBlockCell_headerId_fkey` FOREIGN KEY (`headerId`) REFERENCES `TableBlockHeader`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TableBlockCell` ADD CONSTRAINT `TableBlockCell_rowId_fkey` FOREIGN KEY (`rowId`) REFERENCES `TableBlockRow`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TableBlockCell` ADD CONSTRAINT `TableBlockCell_tableId_pageId_fkey` FOREIGN KEY (`tableId`, `pageId`) REFERENCES `TableBlock`(`id`, `pageId`) ON DELETE CASCADE ON UPDATE CASCADE;

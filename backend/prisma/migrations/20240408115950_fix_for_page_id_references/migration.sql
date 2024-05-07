-- DropForeignKey
ALTER TABLE `TableBlockColumnRow` DROP FOREIGN KEY `TableBlockColumnRow_tableId_id_fkey`;

-- DropForeignKey
ALTER TABLE `TableBlockHeader` DROP FOREIGN KEY `TableBlockHeader_tableId_id_fkey`;

-- AlterTable
ALTER TABLE `Media` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `TableBlockHeader` ADD CONSTRAINT `TableBlockHeader_tableId_pageId_fkey` FOREIGN KEY (`tableId`, `pageId`) REFERENCES `TableBlock`(`id`, `pageId`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TableBlockColumnRow` ADD CONSTRAINT `TableBlockColumnRow_tableId_pageId_fkey` FOREIGN KEY (`tableId`, `pageId`) REFERENCES `TableBlock`(`id`, `pageId`) ON DELETE CASCADE ON UPDATE CASCADE;

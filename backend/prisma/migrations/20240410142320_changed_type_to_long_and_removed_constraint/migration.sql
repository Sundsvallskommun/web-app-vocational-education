-- DropIndex
DROP INDEX `TableBlockColumnRow_tableId_id_fkey` ON `TableBlockColumnRow`;

-- DropIndex
DROP INDEX `TableBlockHeader_tableId_id_fkey` ON `TableBlockHeader`;

-- DropIndex
DROP INDEX `User_SavedSearch_searchTerm_parameters_key` ON `User_SavedSearch`;

-- AlterTable
ALTER TABLE `TableBlockColumnRow` MODIFY `wysiwyg_content` TEXT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `User_SavedSearch` MODIFY `parameters` TEXT NOT NULL;

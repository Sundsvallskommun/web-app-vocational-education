-- AlterTable
ALTER TABLE `ImportantDatesBlock` ADD COLUMN `referencedImportantDatesBlockId` INTEGER NULL,
    ADD COLUMN `referencedImportantDatesBlockPageId` INTEGER NULL,
    ADD COLUMN `referencedImportantDatesBlockPageName` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `ImportantDatesBlock` ADD CONSTRAINT `ImportantDatesBlock_referencedImportantDatesBlockId_referen_fkey` FOREIGN KEY (`referencedImportantDatesBlockId`, `referencedImportantDatesBlockPageName`, `referencedImportantDatesBlockPageId`) REFERENCES `ImportantDatesBlock`(`id`, `pageName`, `pageId`) ON DELETE SET NULL ON UPDATE CASCADE;

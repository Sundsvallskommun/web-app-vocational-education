-- AlterTable
ALTER TABLE `EmployerPromotionsBlock` MODIFY `showBlock` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `FaqBlock` MODIFY `showBlock` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `ImportantDatesBlock` MODIFY `showBlock` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `LogosBlock` MODIFY `showBlock` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `MapBlock` MODIFY `showBlock` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `Page` ADD COLUMN `imgAlt` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `imgSrc` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `imgTitle` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `showEducationsRelatedBlock` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `showEmployerPromotionsBlock` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `showSearchBlock` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `PromotionsBlock` MODIFY `showBlock` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `TableBlock` MODIFY `showBlock` BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE `ContactFormBlock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pageName` VARCHAR(191) NOT NULL,
    `pageId` INTEGER NOT NULL,
    `title` VARCHAR(191) NULL DEFAULT '',
    `description` TEXT NULL DEFAULT '',
    `showBlock` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `ContactFormBlock_id_pageId_key`(`id`, `pageId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactFormBlockEmails` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pageId` INTEGER NOT NULL,
    `formId` INTEGER NOT NULL,
    `label` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ContactFormBlock` ADD CONSTRAINT `ContactFormBlock_pageName_pageId_fkey` FOREIGN KEY (`pageName`, `pageId`) REFERENCES `Page`(`pageName`, `id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactFormBlockEmails` ADD CONSTRAINT `ContactFormBlockEmails_formId_pageId_fkey` FOREIGN KEY (`formId`, `pageId`) REFERENCES `ContactFormBlock`(`id`, `pageId`) ON DELETE CASCADE ON UPDATE CASCADE;

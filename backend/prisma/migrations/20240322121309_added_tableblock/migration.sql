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

-- DropForeignKey
ALTER TABLE `User_SavedInterest` DROP FOREIGN KEY `User_SavedInterest_userId_fkey`;

-- DropForeignKey
ALTER TABLE `User_SavedSearch` DROP FOREIGN KEY `User_SavedSearch_userId_fkey`;

-- AlterTable
ALTER TABLE `Media` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- CreateTable
CREATE TABLE `TableBlock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pageName` VARCHAR(191) NOT NULL,
    `showBlock` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `TableBlock_id_pageName_key`(`id`, `pageName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TableBlockHeader` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tableId` INTEGER NOT NULL,
    `pageName` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `sortable` BOOLEAN NOT NULL DEFAULT false,
    `hidden` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `TableBlockHeader_id_pageName_key`(`id`, `pageName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TableBlockColumnRow` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `headerId` INTEGER NOT NULL,
    `pageName` VARCHAR(191) NOT NULL,
    `tableId` INTEGER NOT NULL,
    `wysiwyg_content` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_SavedSearch` ADD CONSTRAINT `User_SavedSearch_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_SavedInterest` ADD CONSTRAINT `User_SavedInterest_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TableBlock` ADD CONSTRAINT `TableBlock_pageName_fkey` FOREIGN KEY (`pageName`) REFERENCES `Page`(`pageName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TableBlockHeader` ADD CONSTRAINT `TableBlockHeader_tableId_pageName_fkey` FOREIGN KEY (`tableId`, `pageName`) REFERENCES `TableBlock`(`id`, `pageName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TableBlockColumnRow` ADD CONSTRAINT `TableBlockColumnRow_headerId_pageName_fkey` FOREIGN KEY (`headerId`, `pageName`) REFERENCES `TableBlockHeader`(`id`, `pageName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TableBlockColumnRow` ADD CONSTRAINT `TableBlockColumnRow_tableId_pageName_fkey` FOREIGN KEY (`tableId`, `pageName`) REFERENCES `TableBlock`(`id`, `pageName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PromotionsBlock` ADD CONSTRAINT `PromotionsBlock_pageName_fkey` FOREIGN KEY (`pageName`) REFERENCES `Page`(`pageName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PromotionsBlockPromotions` ADD CONSTRAINT `PromotionsBlockPromotions_blockId_pageName_fkey` FOREIGN KEY (`blockId`, `pageName`) REFERENCES `PromotionsBlock`(`id`, `pageName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PromotionsBlockPromotions` ADD CONSTRAINT `PromotionsBlockPromotions_promotedPageName_fkey` FOREIGN KEY (`promotedPageName`) REFERENCES `Page`(`pageName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployerPromotionsBlockPromotions` ADD CONSTRAINT `EmployerPromotionsBlockPromotions_blockId_pageName_fkey` FOREIGN KEY (`blockId`, `pageName`) REFERENCES `EmployerPromotionsBlock`(`id`, `pageName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MapBlock` ADD CONSTRAINT `MapBlock_pageName_fkey` FOREIGN KEY (`pageName`) REFERENCES `Page`(`pageName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImportantDatesBlock` ADD CONSTRAINT `ImportantDatesBlock_pageName_fkey` FOREIGN KEY (`pageName`) REFERENCES `Page`(`pageName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImportantDatesBlockDateCards` ADD CONSTRAINT `ImportantDatesBlockDateCards_blockId_pageName_fkey` FOREIGN KEY (`blockId`, `pageName`) REFERENCES `ImportantDatesBlock`(`id`, `pageName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FaqBlock` ADD CONSTRAINT `FaqBlock_pageName_fkey` FOREIGN KEY (`pageName`) REFERENCES `Page`(`pageName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FaqBlockQuestions` ADD CONSTRAINT `FaqBlockQuestions_blockId_pageName_fkey` FOREIGN KEY (`blockId`, `pageName`) REFERENCES `FaqBlock`(`id`, `pageName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LogosBlock` ADD CONSTRAINT `LogosBlock_pageName_fkey` FOREIGN KEY (`pageName`) REFERENCES `Page`(`pageName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LogosBlockLogos` ADD CONSTRAINT `LogosBlockLogos_blockId_pageName_fkey` FOREIGN KEY (`blockId`, `pageName`) REFERENCES `LogosBlock`(`id`, `pageName`) ON DELETE CASCADE ON UPDATE CASCADE;

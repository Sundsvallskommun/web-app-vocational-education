-- DropForeignKey
ALTER TABLE `EmployerPromotionsBlock` DROP FOREIGN KEY `EmployerPromotionsBlock_pageName_fkey`;

-- CreateTable
CREATE TABLE `_EmployerPromotionsBlockToPage` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_EmployerPromotionsBlockToPage_AB_unique`(`A`, `B`),
    INDEX `_EmployerPromotionsBlockToPage_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_EmployerPromotionsBlockToPage` ADD CONSTRAINT `_EmployerPromotionsBlockToPage_A_fkey` FOREIGN KEY (`A`) REFERENCES `EmployerPromotionsBlock`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_EmployerPromotionsBlockToPage` ADD CONSTRAINT `_EmployerPromotionsBlockToPage_B_fkey` FOREIGN KEY (`B`) REFERENCES `Page`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

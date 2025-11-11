/*
  Warnings:

  - You are about to drop the `_EmployerPromotionsBlockToPage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_EmployerPromotionsBlockToPage` DROP FOREIGN KEY `_EmployerPromotionsBlockToPage_A_fkey`;

-- DropForeignKey
ALTER TABLE `_EmployerPromotionsBlockToPage` DROP FOREIGN KEY `_EmployerPromotionsBlockToPage_B_fkey`;

-- AlterTable
ALTER TABLE `Page` ADD COLUMN `employerPromotionsBlockId` INTEGER NULL;

-- DropTable
DROP TABLE `_EmployerPromotionsBlockToPage`;

-- AddForeignKey
ALTER TABLE `Page` ADD CONSTRAINT `Page_employerPromotionsBlockId_fkey` FOREIGN KEY (`employerPromotionsBlockId`) REFERENCES `EmployerPromotionsBlock`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `Page` ADD COLUMN `showImgInDesktop` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `showImgInMobile` BOOLEAN NOT NULL DEFAULT true;

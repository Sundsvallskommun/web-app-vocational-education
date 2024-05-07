-- CreateTable
CREATE TABLE `EmployerPromotionsBlock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pageName` VARCHAR(191) NOT NULL,
    `showBlock` BOOLEAN NOT NULL DEFAULT false,
    `title` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `EmployerPromotionsBlock_id_pageName_key`(`id`, `pageName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EmployerPromotionsBlockPromotions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `blockId` INTEGER NOT NULL,
    `pageName` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `searchPhrase` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EmployerPromotionsBlock` ADD CONSTRAINT `EmployerPromotionsBlock_pageName_fkey` FOREIGN KEY (`pageName`) REFERENCES `Page`(`pageName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EmployerPromotionsBlockPromotions` ADD CONSTRAINT `EmployerPromotionsBlockPromotions_blockId_pageName_fkey` FOREIGN KEY (`blockId`, `pageName`) REFERENCES `EmployerPromotionsBlock`(`id`, `pageName`) ON DELETE RESTRICT ON UPDATE CASCADE;

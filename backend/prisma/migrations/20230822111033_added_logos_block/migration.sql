-- CreateTable
CREATE TABLE `LogosBlock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pageName` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `showBlock` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `LogosBlock_id_pageName_key`(`id`, `pageName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LogosBlockLogos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `blockId` INTEGER NOT NULL,
    `pageName` VARCHAR(191) NOT NULL,
    `src` VARCHAR(191) NOT NULL,
    `alt` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LogosBlock` ADD CONSTRAINT `LogosBlock_pageName_fkey` FOREIGN KEY (`pageName`) REFERENCES `Page`(`pageName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LogosBlockLogos` ADD CONSTRAINT `LogosBlockLogos_blockId_pageName_fkey` FOREIGN KEY (`blockId`, `pageName`) REFERENCES `LogosBlock`(`id`, `pageName`) ON DELETE RESTRICT ON UPDATE CASCADE;

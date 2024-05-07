-- CreateTable
CREATE TABLE `FaqBlock` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pageName` VARCHAR(191) NOT NULL,
    `showBlock` BOOLEAN NOT NULL DEFAULT false,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `FaqBlock_id_pageName_key`(`id`, `pageName`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FaqBlockQuestions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pageName` VARCHAR(191) NOT NULL,
    `blockId` INTEGER NOT NULL,
    `question` VARCHAR(191) NOT NULL,
    `answer` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FaqBlock` ADD CONSTRAINT `FaqBlock_pageName_fkey` FOREIGN KEY (`pageName`) REFERENCES `Page`(`pageName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FaqBlockQuestions` ADD CONSTRAINT `FaqBlockQuestions_blockId_pageName_fkey` FOREIGN KEY (`blockId`, `pageName`) REFERENCES `FaqBlock`(`id`, `pageName`) ON DELETE RESTRICT ON UPDATE CASCADE;

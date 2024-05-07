-- AlterTable
ALTER TABLE `Media` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- CreateTable
CREATE TABLE `User_SavedSearch` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `searchTerm` VARCHAR(191) NOT NULL,
    `parameters` VARCHAR(191) NOT NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `User_SavedSearch_searchTerm_parameters_key`(`searchTerm`, `parameters`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_SavedSearch` ADD CONSTRAINT `User_SavedSearch_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

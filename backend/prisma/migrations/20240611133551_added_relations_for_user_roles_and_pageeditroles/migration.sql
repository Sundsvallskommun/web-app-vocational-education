/*
  Warnings:

  - You are about to drop the `_PageToUserRole` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserToUserRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_PageToUserRole` DROP FOREIGN KEY `_PageToUserRole_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PageToUserRole` DROP FOREIGN KEY `_PageToUserRole_B_fkey`;

-- DropForeignKey
ALTER TABLE `_UserToUserRole` DROP FOREIGN KEY `_UserToUserRole_A_fkey`;

-- DropForeignKey
ALTER TABLE `_UserToUserRole` DROP FOREIGN KEY `_UserToUserRole_B_fkey`;

-- DropTable
DROP TABLE `_PageToUserRole`;

-- DropTable
DROP TABLE `_UserToUserRole`;

-- CreateTable
CREATE TABLE `UserRolesOnUser` (
    `username` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'EDUCATIONCOORDINATOR', 'EDITOR', 'ADMIN') NOT NULL,

    PRIMARY KEY (`username`, `role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `EditRolesOnPage` (
    `pageName` VARCHAR(191) NOT NULL,
    `role` ENUM('USER', 'EDUCATIONCOORDINATOR', 'EDITOR', 'ADMIN') NOT NULL,

    PRIMARY KEY (`pageName`, `role`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserRolesOnUser` ADD CONSTRAINT `UserRolesOnUser_username_fkey` FOREIGN KEY (`username`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRolesOnUser` ADD CONSTRAINT `UserRolesOnUser_role_fkey` FOREIGN KEY (`role`) REFERENCES `UserRole`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EditRolesOnPage` ADD CONSTRAINT `EditRolesOnPage_pageName_fkey` FOREIGN KEY (`pageName`) REFERENCES `Page`(`pageName`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EditRolesOnPage` ADD CONSTRAINT `EditRolesOnPage_role_fkey` FOREIGN KEY (`role`) REFERENCES `UserRole`(`name`) ON DELETE RESTRICT ON UPDATE CASCADE;

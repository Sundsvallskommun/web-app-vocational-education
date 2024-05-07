/*
  Warnings:

  - You are about to drop the column `Roles` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Media` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `Roles`,
    ADD COLUMN `Role` ENUM('USER', 'EDUCATIONCOORDINATOR', 'EDITOR', 'ADMIN') NOT NULL DEFAULT 'USER';

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

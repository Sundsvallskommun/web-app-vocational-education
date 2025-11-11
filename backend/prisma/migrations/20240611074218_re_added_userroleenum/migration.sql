/*
  Warnings:

  - You are about to alter the column `name` on the `UserRole` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `UserRole` MODIFY `name` ENUM('USER', 'EDUCATIONCOORDINATOR', 'EDITOR', 'ADMIN') NOT NULL;

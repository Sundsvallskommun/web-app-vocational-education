/*
  Warnings:

  - You are about to drop the column `src` on the `LogosBlockLogos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `LogosBlockLogos` DROP COLUMN `src`,
    ADD COLUMN `filename` VARCHAR(191) NOT NULL DEFAULT '';

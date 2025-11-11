/*
  Warnings:

  - You are about to drop the column `location` on the `User_SavedInterest` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `User_SavedInterest` table. All the data in the column will be lost.
  - MODIFIED: A unique constraint covering the columns `[category,type,location]` on the table `User_SavedInterest` will be removed.

*/
-- DropIndex
DROP INDEX `User_SavedInterest_category_type_location_key` ON `User_SavedInterest`;

-- AlterTable
ALTER TABLE `User_SavedInterest` DROP COLUMN `location`,
    DROP COLUMN `type`,
    ADD COLUMN `level` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `studyLocation` VARCHAR(191) NOT NULL DEFAULT '';
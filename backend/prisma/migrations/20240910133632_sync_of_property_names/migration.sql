/*
  Warnings:

  - You are about to drop the column `location` on the `User_SavedInterest` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `User_SavedInterest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[category,level,studyLocation]` on the table `User_SavedInterest` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `User_SavedInterest_category_type_location_key` ON `User_SavedInterest`;

-- AlterTable
ALTER TABLE `User_SavedInterest` DROP COLUMN `location`,
    DROP COLUMN `type`,
    ADD COLUMN `level` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `studyLocation` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX `User_SavedInterest_category_level_studyLocation_key` ON `User_SavedInterest`(`category`, `level`, `studyLocation`);

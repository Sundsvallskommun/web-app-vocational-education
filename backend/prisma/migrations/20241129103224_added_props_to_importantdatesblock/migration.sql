/*
  Warnings:

  - You are about to drop the column `url` on the `ImportantDatesBlockDateCards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ImportantDatesBlock` ADD COLUMN `amountShown` INTEGER NOT NULL DEFAULT 3,
    ADD COLUMN `showAll` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `showSeeAllButton` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `ImportantDatesBlockDateCards` DROP COLUMN `url`;

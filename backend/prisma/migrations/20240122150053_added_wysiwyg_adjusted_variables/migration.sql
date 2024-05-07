/*
  Warnings:

  - You are about to drop the column `text` on the `EmployerPromotionsBlockPromotions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `EmployerPromotionsBlockPromotions` DROP COLUMN `text`,
    ADD COLUMN `ingress` TEXT NOT NULL DEFAULT '',
    ADD COLUMN `wysiwyg_content` TEXT NOT NULL DEFAULT '';

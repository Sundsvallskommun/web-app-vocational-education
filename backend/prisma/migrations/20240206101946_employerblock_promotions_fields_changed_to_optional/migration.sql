-- AlterTable
ALTER TABLE `EmployerPromotionsBlockPromotions` MODIFY `title` VARCHAR(191) NULL,
    MODIFY `searchPhrase` VARCHAR(191) NULL,
    MODIFY `ingress` TEXT NULL DEFAULT '',
    MODIFY `wysiwyg_content` TEXT NULL DEFAULT '';

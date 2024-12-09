-- AlterTable
ALTER TABLE `Page` ADD COLUMN `blockOrder` VARCHAR(191) NOT NULL DEFAULT 'wysiwyg_content,tableBlock,promotionsBlock,mapBlock,employerPromotionsBlock,educationsStartingBlock,importantDatesBlock,faqBlock,contactFormBlock,searchBlock,logosBlock';

-- DropIndex
DROP INDEX `User_email_key` ON `User`;

-- AlterTable
ALTER TABLE `Media` ALTER COLUMN `updatedAt` DROP DEFAULT;

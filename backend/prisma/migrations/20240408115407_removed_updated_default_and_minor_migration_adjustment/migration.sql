-- AlterTable
ALTER TABLE `Media` ALTER COLUMN `updatedAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `TableBlockHeader` ALTER COLUMN `pageId` DROP DEFAULT;

-- AlterTable
ALTER TABLE `User_SavedInterest` ALTER COLUMN `timeInterval` DROP DEFAULT,
    ALTER COLUMN `timeIntervalFrom` DROP DEFAULT,
    ALTER COLUMN `timeIntervalTo` DROP DEFAULT;

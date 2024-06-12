-- DropForeignKey
ALTER TABLE `EditRolesOnPage` DROP FOREIGN KEY `EditRolesOnPage_pageName_fkey`;

-- DropForeignKey
ALTER TABLE `EditRolesOnPage` DROP FOREIGN KEY `EditRolesOnPage_role_fkey`;

-- DropForeignKey
ALTER TABLE `UserRolesOnUser` DROP FOREIGN KEY `UserRolesOnUser_role_fkey`;

-- DropForeignKey
ALTER TABLE `UserRolesOnUser` DROP FOREIGN KEY `UserRolesOnUser_username_fkey`;

-- AddForeignKey
ALTER TABLE `UserRolesOnUser` ADD CONSTRAINT `UserRolesOnUser_username_fkey` FOREIGN KEY (`username`) REFERENCES `User`(`username`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRolesOnUser` ADD CONSTRAINT `UserRolesOnUser_role_fkey` FOREIGN KEY (`role`) REFERENCES `UserRole`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EditRolesOnPage` ADD CONSTRAINT `EditRolesOnPage_pageName_fkey` FOREIGN KEY (`pageName`) REFERENCES `Page`(`pageName`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EditRolesOnPage` ADD CONSTRAINT `EditRolesOnPage_role_fkey` FOREIGN KEY (`role`) REFERENCES `UserRole`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable
ALTER TABLE `asset` MODIFY `is_active` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `asset_location_history` MODIFY `is_active` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `asset_photo` MODIFY `is_active` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `asset_type` MODIFY `code` VARCHAR(100) NULL,
    MODIFY `is_active` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `budget_type` MODIFY `code` VARCHAR(100) NOT NULL,
    MODIFY `is_active` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `department` MODIFY `code` VARCHAR(100) NOT NULL,
    MODIFY `is_active` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `holder_history` MODIFY `is_active` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `repair_history` MODIFY `is_active` INTEGER NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `user` MODIFY `is_active` INTEGER NULL DEFAULT 1;

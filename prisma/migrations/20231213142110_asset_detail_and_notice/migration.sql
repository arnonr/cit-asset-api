-- AlterTable
ALTER TABLE `asset` ADD COLUMN `asset_detail` TEXT NULL,
    ADD COLUMN `expiry_date_3` DATE NULL,
    ADD COLUMN `install_location` VARCHAR(200) NULL,
    ADD COLUMN `warranty_day_3` INTEGER NULL,
    ADD COLUMN `warranty_type_3` VARCHAR(200) NULL;

-- AlterTable
ALTER TABLE `asset_location_history` ADD COLUMN `is_notice` TINYINT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `holder_history` ADD COLUMN `is_notice` TINYINT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `repair_history` ADD COLUMN `is_notice` TINYINT NULL DEFAULT 0;

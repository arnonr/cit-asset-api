-- AlterTable
ALTER TABLE `asset_type` ADD COLUMN `name_abbr` VARCHAR(200) NULL;

-- AlterTable
ALTER TABLE `budget_type` ADD COLUMN `name_abbr` VARCHAR(200) NULL;

-- AlterTable
ALTER TABLE `department` ADD COLUMN `name_abbr` VARCHAR(200) NULL;

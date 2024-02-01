-- AlterTable
ALTER TABLE `asset` MODIFY `serial_number` VARCHAR(250) NULL;

-- AlterTable
ALTER TABLE `asset_location_history` ADD COLUMN `previous_location` VARCHAR(200) NULL;

-- AlterTable
ALTER TABLE `holder_history` ADD COLUMN `previous_holder_name` VARCHAR(200) NULL;

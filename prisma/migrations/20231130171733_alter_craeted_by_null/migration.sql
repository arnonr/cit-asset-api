-- AlterTable
ALTER TABLE `asset_location_history` MODIFY `created_by` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `holder_history` MODIFY `created_by` VARCHAR(255) NULL;

-- AlterTable
ALTER TABLE `repair_history` MODIFY `created_by` VARCHAR(255) NULL;

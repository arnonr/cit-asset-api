-- AlterTable
ALTER TABLE `asset` MODIFY `inspection_date` DATE NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `deleted_at` DATETIME(3) NULL;

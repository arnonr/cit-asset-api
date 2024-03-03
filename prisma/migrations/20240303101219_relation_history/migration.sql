-- AddForeignKey
ALTER TABLE `asset_location_history` ADD CONSTRAINT `asset_location_history_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `user`(`username`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asset_location_history` ADD CONSTRAINT `asset_location_history_approved_by_fkey` FOREIGN KEY (`approved_by`) REFERENCES `user`(`username`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `holder_history` ADD CONSTRAINT `holder_history_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `user`(`username`) ON DELETE SET NULL ON UPDATE CASCADE;

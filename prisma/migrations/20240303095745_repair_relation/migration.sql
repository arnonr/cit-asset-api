-- AddForeignKey
ALTER TABLE `repair_history` ADD CONSTRAINT `repair_history_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `user`(`username`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `repair_history` ADD CONSTRAINT `repair_history_approved_by_fkey` FOREIGN KEY (`approved_by`) REFERENCES `user`(`username`) ON DELETE SET NULL ON UPDATE CASCADE;

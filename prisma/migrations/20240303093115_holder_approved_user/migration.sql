-- AddForeignKey
ALTER TABLE `holder_history` ADD CONSTRAINT `holder_history_approved_by_fkey` FOREIGN KEY (`approved_by`) REFERENCES `user`(`username`) ON DELETE SET NULL ON UPDATE CASCADE;

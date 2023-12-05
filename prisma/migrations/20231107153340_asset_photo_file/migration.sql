/*
  Warnings:

  - You are about to drop the column `asset_gallery_file` on the `asset_photo` table. All the data in the column will be lost.
  - Added the required column `asset_photo_file` to the `asset_photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE `asset_photo` DROP COLUMN `asset_gallery_file`,
--    ADD COLUMN `asset_photo_file` VARCHAR(200) NOT NULL;

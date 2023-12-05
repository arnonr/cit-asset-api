/*
  Warnings:

  - You are about to drop the column `filename` on the `asset_photo` table. All the data in the column will be lost.
  - Added the required column `asset_gallery_file` to the `asset_photo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- ALTER TABLE `asset_photo` DROP COLUMN `filename`,
--    ADD COLUMN `asset_gallery_file` VARCHAR(200) NOT NULL;

-- CreateTable
CREATE TABLE `asset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `asset_code` VARCHAR(50) NULL,
    `input_year` YEAR NULL,
    `inspection_date` DATE NOT NULL,
    `approved_date` DATE NULL,
    `vendor` VARCHAR(200) NULL,
    `asset_type_id` INTEGER NOT NULL,
    `brand` VARCHAR(200) NULL,
    `model` VARCHAR(200) NULL,
    `serial_number` VARCHAR(100) NULL,
    `price` DECIMAL(10, 2) NULL,
    `budget_type_id` INTEGER NOT NULL,
    `is_transfer` TINYINT NULL,
    `transfer_from` VARCHAR(200) NULL,
    `location` VARCHAR(200) NULL,
    `department_id` INTEGER NULL,
    `drawer_name` VARCHAR(200) NULL,
    `holder_name` VARCHAR(200) NULL,
    `warranty_type_1` VARCHAR(200) NULL,
    `warranty_day_1` INTEGER NULL,
    `warranty_type_2` VARCHAR(200) NULL,
    `warranty_day_2` INTEGER NULL,
    `cover_photo` VARCHAR(200) NULL,
    `asset_status` TINYINT NULL,
    `cancel_type` TINYINT NULL,
    `cancel_date` DATE NULL,
    `cancel_comment` VARCHAR(200) NULL,
    `transfer_to` VARCHAR(200) NULL,
    `transfer_to_department` VARCHAR(200) NULL,
    `comment` VARCHAR(200) NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(255) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(255) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `asset_asset_code_key`(`asset_code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asset_location_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `asset_id` INTEGER NOT NULL,
    `location` VARCHAR(200) NULL,
    `status` TINYINT NOT NULL DEFAULT 0,
    `approved_at` DATETIME(3) NULL,
    `approved_by` VARCHAR(32) NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(255) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(255) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asset_photo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `asset_id` INTEGER NULL,
    `secret_key` VARCHAR(255) NOT NULL,
    `filename` VARCHAR(200) NOT NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(255) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(255) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `asset_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(10) NULL,
    `name` VARCHAR(200) NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(32) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(32) NULL,
    `deleted_at` DATETIME(3) NULL,

    UNIQUE INDEX `asset_type_code_key`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `budget_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(32) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(32) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `department` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(10) NOT NULL,
    `name` VARCHAR(200) NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(32) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(32) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `holder_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `asset_id` INTEGER NOT NULL,
    `holder_name` VARCHAR(200) NULL,
    `status` TINYINT NOT NULL DEFAULT 0,
    `approved_at` DATETIME(3) NULL,
    `approved_by` VARCHAR(32) NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(255) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(255) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `repair_history` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `asset_id` INTEGER NOT NULL,
    `repair_date` DATE NULL,
    `description` TEXT NULL,
    `price` DECIMAL(10, 2) NULL,
    `status` TINYINT NOT NULL DEFAULT 0,
    `reject_comment` VARCHAR(200) NULL,
    `approved_at` DATETIME(3) NULL,
    `approved_by` VARCHAR(32) NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(255) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(255) NULL,
    `deleted_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(32) NOT NULL,
    `password` VARCHAR(100) NULL,
    `name` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NULL,
    `tel` VARCHAR(100) NULL,
    `level` INTEGER NOT NULL DEFAULT 1,
    `department_id` INTEGER NULL,
    `is_active` INTEGER NOT NULL DEFAULT 1,
    `created_at` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `created_by` VARCHAR(255) NULL,
    `updated_at` DATETIME(3) NULL,
    `updated_by` VARCHAR(255) NULL,

    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `asset` ADD CONSTRAINT `asset_asset_type_id_fkey` FOREIGN KEY (`asset_type_id`) REFERENCES `asset_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asset` ADD CONSTRAINT `asset_budget_type_id_fkey` FOREIGN KEY (`budget_type_id`) REFERENCES `budget_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asset` ADD CONSTRAINT `asset_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asset_location_history` ADD CONSTRAINT `asset_location_history_asset_id_fkey` FOREIGN KEY (`asset_id`) REFERENCES `asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `asset_photo` ADD CONSTRAINT `asset_photo_asset_id_fkey` FOREIGN KEY (`asset_id`) REFERENCES `asset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `holder_history` ADD CONSTRAINT `holder_history_asset_id_fkey` FOREIGN KEY (`asset_id`) REFERENCES `asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `repair_history` ADD CONSTRAINT `repair_history_asset_id_fkey` FOREIGN KEY (`asset_id`) REFERENCES `asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_department_id_fkey` FOREIGN KEY (`department_id`) REFERENCES `department`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

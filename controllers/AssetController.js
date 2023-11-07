const { PrismaClient } = require("@prisma/client");
const uploadController = require("./UploadsController");
// const prisma = new PrismaClient();
const $table = "asset";

const prisma = new PrismaClient().$extends({
    result: {
        asset: {
            cover_photo: {
                needs: { cover_photo: true },
                compute(asset) {
                    let cover_photo = null;
                    if (asset.cover_photo != null) {
                        cover_photo = process.env.PATH_UPLOAD + asset.cover_photo;
                    }
                    return cover_photo;
                },
            },
        },
    },
});

const filterData = (req) => {
    let $where = {
        deleted_at: null,
    };

    if (req.query.id) {
        $where["id"] = parseInt(req.query.id);
    }

    if (req.query.asset_code) {
        $where["asset_code"] = {
        contains: req.query.asset_code,
        //   mode: "insensitive",
        };
    }

    if (req.query.asset_name) {
        $where["asset_name"] = {
        contains: req.query.asset_name,
        //   mode: "insensitive",
        };
    }
    // Number
    if (req.query.input_year) {
        $where["is_active"] = parseInt(req.query.input_year);
    }

    if (req.query.inspection_date) {
        $where["inspection_date"] = {
        contains: req.query.inspection_date,
        //   mode: "insensitive",
        };
    }

    if (req.query.approved_date) {
        $where["approved_date"] = {
        contains: req.query.approved_date,
        //   mode: "insensitive",
        };
    }

    if (req.query.vendor) {
        $where["vendor"] = {
        contains: req.query.vendor,
        //   mode: "insensitive",
        };
    }

    if (req.query.asset_type_id) {
        $where["asset_type_id"] = parseInt(req.query.asset_type_id);
    }

    if (req.query.brand) {
        $where["brand"] = {
        contains: req.query.brand,
        //   mode: "insensitive",
        };
    }

    if (req.query.model) {
        $where["model"] = {
        contains: req.query.model,
        //   mode: "insensitive",
        };
    }

    if (req.query.serial_number) {
        $where["serial_number"] = {
        contains: req.query.serial_number,
        //   mode: "insensitive",
        };
    }

    if (req.query.price) {
        $where["price"] = Number(req.query.price);
    }

    if (req.query.budget_type_id) {
        $where["budget_type_id"] = parseInt(req.query.budget_type_id);
    }

    if (req.query.is_transfer) {
        $where["is_transfer"] = parseInt(req.query.is_transfer);
    }

    if (req.query.transfer_from) {
        $where["transfer_from"] = {
        contains: req.query.transfer_from,
        //   mode: "insensitive",
        };
    }

    if (req.query.location) {
        $where["location"] = {
        contains: req.query.location,
        //   mode: "insensitive",
        };
    }

    if (req.query.department_id) {
        $where["department_id"] = parseInt(req.query.department_id);
    }

    if (req.query.drawer_name) {
        $where["drawer_name"] = {
        contains: req.query.drawer_name,
        //   mode: "insensitive",
        };
    }

    if (req.query.holder_name) {
        $where["holder_name"] = {
        contains: req.query.holder_name,
        //   mode: "insensitive",
        };
    }

    if (req.query.warranty_type_1) {
        $where["warranty_type_1"] = {
        contains: req.query.warranty_type_1,
        //   mode: "insensitive",
        };
    }

    if (req.query.warranty_day_1) {
        $where["warranty_day_1"] = parseInt(req.query.warranty_day_1);
    }

    if (req.query.warranty_type_2) {
        $where["warranty_type_2"] = {
        contains: req.query.warranty_type_2,
        //   mode: "insensitive",
        };
    }

    if (req.query.warranty_day_2) {
        $where["warranty_day_2"] = parseInt(req.query.warranty_day_2);
    }

    if (req.query.cover_photo) {
        $where["cover_photo"] = {
        contains: req.query.cover_photo,
        //   mode: "insensitive",
        };
    }

    if (req.query.asset_status) {
        $where["asset_status"] = parseInt(req.query.asset_status);
    }

    if (req.query.cancel_type) {
        $where["cancel_type"] = parseInt(req.query.cancel_type);
    }

    if (req.query.cancel_date) {
        $where["cancel_date"] = {
        contains: req.query.cancel_date,
        //   mode: "insensitive",
        };
    }

    if (req.query.cancel_comment) {
        $where["cancel_comment"] = {
        contains: req.query.cancel_comment,
        //   mode: "insensitive",
        };
    }

    if (req.query.transfer_to) {
        $where["transfer_to"] = {
        contains: req.query.transfer_to,
        //   mode: "insensitive",
        };
    }

    if (req.query.transfer_to_department) {
        $where["transfer_to_department"] = {
        contains: req.query.transfer_to_department,
        //   mode: "insensitive",
        };
    }

    if (req.query.comment) {
        $where["comment"] = {
        contains: req.query.comment,
        //   mode: "insensitive",
        };
    }

    if (req.query.is_active) {
        $where["is_active"] = parseInt(req.query.is_active);
    }

    return $where;
};

// หาจำนวนทั้งหมดและลำดับ
const countDataAndOrder = async (req, $where) => {
    //   Order
    let $orderBy = {};
    if (req.query.orderBy) {
        $orderBy[req.query.orderBy] = req.query.order;
    } else {
        $orderBy = { created_at: "asc" };
    }

    //Count

    let $count = await prisma[$table].findMany({
        where: $where,
    });

    $count = $count.length;
    let $perPage = req.query.perPage ? Number(req.query.perPage) : 10;
    let $currentPage = req.query.currentPage ? Number(req.query.currentPage) : 1;
    let $totalPage =
        Math.ceil($count / $perPage) == 0 ? 1 : Math.ceil($count / $perPage);
    let $offset = $perPage * ($currentPage - 1);

    return {
        $orderBy: $orderBy,
        $offset: $offset,
        $perPage: $perPage,
        $count: $count,
        $totalPage: $totalPage,
        $currentPage: $currentPage,
    };
};

// ฟิลด์ที่ต้องการ Select รวมถึง join
const selectField = {
    id: true,
    asset_code: true,
    asset_name: true,
    input_year: true,
    inspection_date: true,
    approved_date: true,
    vendor: true,
    asset_type_id: true,
    brand: true,
    model: true,
    serial_number: true,
    price: true,
    budget_type_id: true,
    is_transfer: true,
    transfer_from: true,
    location: true,
    department_id: true,
    drawer_name: true,
    holder_name: true,
    warranty_type_1: true,
    warranty_day_1: true,
    warranty_type_2: true,
    warranty_day_2: true,
    cover_photo: true,
    asset_status: true,
    cancel_type: true,
    cancel_date: true,
    cancel_comment: true,
    transfer_to: true,
    transfer_to_department: true,
    comment: true,
    is_active: true,
    asset_type: {
        select: {
            id: true,
            code: true,
            name: true,
            is_active: true,
        },
    },
    budget_type: {
        select: {
            id: true,
            code: true,
            name: true,
            is_active: true,
        },
    },
    department: {
        select: {
            id: true,
            code: true,
            name: true,
            is_active: true,
        },
    },
    asset_photo: {
        select: {
            id: true,
            filename: true,
            secret_key: true,
            is_active: true,
        },
    },
    repair_history: {
        select: {
            id: true,
            asset_id: true,
            repair_date: true,
            description: true,
            price: true,
            status: true,
            reject_comment: true,
            approved_at: true,
            approved_by: true,
            is_active: true,
        },
    },
    holder_history: {
        select: {
            id: true,
            asset_id: true,
            holder_name: true,
            status: true,
            approved_at: true,
            approved_by: true,
            is_active: true,
        },
    },
    asset_location_history: {
        select: {
            id: true,
            asset_id: true,
            location: true,
            status: true,
            approved_at: true,
            approved_by: true,
            is_active: true,
        },
    },
};

const methods = {
    // ค้นหาทั้งหมด
    async onGetAll(req, res) {
        try {
            let $where = filterData(req);
            let other = await countDataAndOrder(req, $where);

            const item = await prisma[$table].findMany({
                select: selectField,
                where: $where,
                orderBy: other.$orderBy,
                skip: other.$offset,
                take: other.$perPage,
            });

            res.status(200).json({
                data: item,
                totalData: other.$count,
                totalPage: other.$totalPage,
                currentPage: other.$currentPage,
                msg: "success",
            });
        } catch (error) {
            res.status(500).json({ msg: error.message });
        }
    },
    // ค้นหาเรคคอร์ดเดียว
    async onGetById(req, res) {
        try {
            const item = await prisma[$table].findUnique({
                select: selectField,
                where: {
                    id: Number(req.params.id),
                },
            });
            res.status(200).json({ data: item, msg: " success" });
        } catch (error) {
            res.status(404).json({ msg: error.message });
        }
    },

    // สร้าง
    async onCreate(req, res) {
        try {

            let pathFile = await uploadController.onUploadFile(
                req,
                "/images/asset/",
                "cover_photo"
            );

            if (pathFile == "error") {
                return res.status(500).send("error");
            }

            const item = await prisma[$table].create({
                data: {

                    asset_code: req.body.asset_code,
                    asset_name: req.body.asset_name,
                    input_year: req.body.input_year,
                    inspection_date: req.body.inspection_date != null ? new Date(req.body.inspection_date) : undefined,
                    approved_date: req.body.approved_date != null ? new Date(req.body.approved_date) : undefined,
                    vendor: req.body.vendor,
                    asset_type_id: Number(req.body.asset_type_id),
                    brand: req.body.brand,
                    model: req.body.model,
                    serial_number: req.body.serial_number,
                    price: Number(req.body.price),
                    budget_type_id: Number(req.body.budget_type_id),
                    is_transfer: Number(req.body.is_transfer),
                    transfer_from: req.body.transfer_from,
                    location: req.body.location,
                    department_id: Number(req.body.department_id),
                    drawer_name: req.body.drawer_name,
                    holder_name: req.body.holder_name,
                    warranty_type_1: req.body.warranty_type_1,
                    warranty_day_1: Number(req.body.warranty_day_1),
                    warranty_type_2: req.body.warranty_type_2,
                    warranty_day_2: Number(req.body.warranty_day_2),
                    cover_photo: pathFile,
                    asset_status: Number(req.body.asset_status),
                    cancel_type: Number(req.body.cancel_type),
                    cancel_date: req.body.cancel_date != null ? new Date(req.body.cancel_date) : undefined,
                    cancel_comment: req.body.cancel_comment,
                    transfer_to: req.body.transfer_to,
                    transfer_to_department: req.body.transfer_to_department,
                    comment: req.body.comment,

                    is_active: Number(req.body.is_active),
                    created_by: "arnonr",
                    updated_by: "arnonr",
                },
            });

            await prisma.asset_photo.updateMany({
                where: {
                    secret_key: req.body.secret_key,
                },
                data: {
                    asset_id: item.id,
                },
            });

            res.status(201).json({ ...item, msg: "success" });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    },

    // แก้ไข
    async onUpdate(req, res) {
        try {

            let pathFile = await uploadController.onUploadFile(
                req,
                "/images/asset/",
                "cover_photo"
            );

            if (pathFile == "error") {
                return res.status(500).send("error");
            }

            const item = await prisma[$table].update({
                where: {
                    id: Number(req.params.id),
                },

                data: {
                    asset_code: req.body.asset_code != null ? req.body.asset_code : undefined,
                    asset_name: req.body.asset_name != null ? req.body.asset_name : undefined,
                    input_year: req.body.input_year != null ? req.body.input_year : undefined,
                    inspection_date: req.body.inspection_date != null ? new Date(req.body.inspection_date) : undefined,
                    approved_date: req.body.approved_date != null ? new Date(req.body.approved_date) : undefined,
                    vendor: req.body.vendor != null ? req.body.vendor : undefined,
                    asset_type_id: req.body.asset_type_id != null ? Number(req.body.asset_type_id) : undefined,
                    brand: req.body.brand != null ? req.body.brand : undefined,
                    model: req.body.model != null ? req.body.model : undefined,
                    serial_number: req.body.serial_number != null ? req.body.serial_number : undefined,
                    price: req.body.price != null ? Number(req.body.price) : undefined,
                    budget_type_id: req.body.budget_type_id != null ? Number(req.body.budget_type_id) : undefined,
                    is_transfer: req.body.is_transfer != null ? Number(req.body.is_transfer) : undefined,
                    transfer_from: req.body.transfer_from != null ? req.body.transfer_from : undefined,
                    location: req.body.location != null ? req.body.location : undefined,
                    department_id: req.body.department_id != null ? Number(req.body.department_id) : undefined,
                    drawer_name: req.body.drawer_name != null ? req.body.drawer_name : undefined,
                    holder_name: req.body.holder_name != null ? req.body.holder_name : undefined,
                    warranty_type_1: req.body.warranty_type_1 != null ? req.body.warranty_type_1 : undefined,
                    warranty_day_1: req.body.warranty_day_1 != null ? Number(req.body.warranty_day_1) : undefined,
                    warranty_type_2: req.body.warranty_type_2 != null ? req.body.warranty_type_2 : undefined,
                    warranty_day_2: req.body.warranty_day_2 != null ? Number(req.body.warranty_day_2) : undefined,
                    asset_status: req.body.asset_status != null ? Number(req.body.asset_status) : undefined,
                    cancel_type: req.body.cancel_type != null ? Number(req.body.cancel_type) : undefined,
                    cancel_date: req.body.cancel_date != null ? new Date(req.body.cancel_date) : undefined,
                    cancel_comment: req.body.cancel_comment != null ? req.body.cancel_comment : undefined,
                    transfer_to: req.body.transfer_to != null ? req.body.transfer_to : undefined,
                    transfer_to_department: req.body.transfer_to_department != null ? req.body.transfer_to_department : undefined,
                    comment: req.body.comment != null ? req.body.comment : undefined,

                    is_active: req.body.is_active != null ? Number(req.body.is_active) : undefined,
                    updated_by: "arnonr",

                    cover_photo: pathFile != null ? pathFile : undefined,
                },
            });

            await prisma.asset_photo.updateMany({
                where: {
                    secret_key: req.body.secret_key,
                },
                data: {
                    asset_id: item.id,
                },
            });

            res.status(200).json({ ...item, msg: "success" });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    },

    // ลบ
    async onDelete(req, res) {
        try {
            await prisma[$table].update({
            where: {
                id: Number(req.params.id),
            },
            data: {
                deleted_at: new Date().toISOString(),
            },
            });

            res.status(200).json({
            msg: "success",
            });
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
        },
    };

    module.exports = { ...methods };

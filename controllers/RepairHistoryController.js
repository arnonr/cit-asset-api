const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const $table = "repair_history";

const filterData = (req) => {
    let $where = {
        deleted_at: null,
    };

    if (req.query.id) {
        $where["id"] = parseInt(req.query.id);
    }

    if (req.query.asset_id) {
        $where["asset_id"] = parseInt(req.query.asset_id);
    }   
    
    if (req.query.repair_date) {
        $where["repair_date"] = {
        contains: req.query.repair_date,
        //   mode: "insensitive",
        };
    }   
    
    if (req.query.description) {
        $where["description"] = {
        contains: req.query.description,
        //   mode: "insensitive",
        };
    }  
       
    if (req.query.price) {
        $where["price"] = Number(req.query.price);
    } 

    if (req.query.status) {
        $where["status"] = parseInt(req.query.status);
    }  

    if (req.query.reject_comment) {
        $where["reject_comment"] = {
        contains: req.query.reject_comment,
        //   mode: "insensitive",
        };
    }         

    if (req.query.approved_at) {
        $where["approved_at"] = {
        contains: req.query.approved_at,
        //   mode: "insensitive",
        };
    }

    if (req.query.approved_by) {
        $where["approved_by"] = {
        contains: req.query.approved_by,
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
    asset_id: true,
    repair_date: true,
    description: true,
    price: true,    
    status: true,
    reject_comment: true,    
    approved_at: true,
    approved_by: true,
    is_active: true,
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
            const item = await prisma[$table].create({
                data: {
                    asset_id: req.body.asset_id,
                    repair_date: req.body.repair_date, 
                    description: req.body.description,    
                    price: Number(req.body.price),                   
                    status: Number(req.body.status),
                    reject_comment: req.body.reject_comment,                     
                    approved_at: req.body.approved_at,                                     
                    approved_by: req.body.approved_by,                      
                    is_active: Number(req.body.is_active),
                    created_by: "arnonr",
                    updated_by: "arnonr",
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
  
            const item = await prisma[$table].update({
                where: {
                    id: Number(req.params.id),
                },
                
                data: {
                    asset_id: req.body.asset_id != null ? req.body.asset_id : undefined,
                    repair_date: req.body.repair_date != null ? req.body.repair_date : undefined,
                    description: req.body.description != null ? req.body.description : undefined,
                    price:req.body.price != null ? Number(req.body.price) : undefined,                    
                    status:req.body.status != null ? Number(req.body.status) : undefined,
                    reject_comment:req.body.reject_comment != null ? Number(req.body.reject_comment) : undefined,                    
                    approved_at: req.body.approved_at != null ? req.body.approved_at : undefined,
                    approved_by: req.body.approved_by != null ? req.body.approved_by : undefined,                     
                    is_active:req.body.is_active != null ? Number(req.body.is_active) : undefined,
                    updated_by: "arnonr",
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

const { PrismaClient } = require("@prisma/client");
const uploadController = require("./UploadsController");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const algorithm = "aes-256-cbc"; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const axios = require("axios").default;
// const { expressjwt: jwt1 } = require("express-jwt");
const $table = "user";

const prisma = new PrismaClient();

// ค้นหา
const filterData = (req) => {
  let $where = {
    deleted_at: null,
  };

  if (req.query.id) {
    $where["id"] = parseInt(req.query.id);
  }

  if (req.query.username) {
    $where["username"] = req.query.username;
  }

  if (req.query.name) {
    $where["name"] = req.query.name;
  }

  if (req.query.email) {
    $where["email"] = req.query.email;
  }

  if (req.query.tel) {
    $where["tel"] = req.query.tel;
  }

  if (req.query.level) {
    $where["level"] = parseInt(req.query.level);
  }

  if (req.query.secret_confirm_email) {
    $where["secret_confirm_email"] = req.query.secret_confirm_email;
  }

  if (req.query.department_id) {
    $where["department_id"] = parseInt(req.query.department_id);
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
    $orderBy = { created_at: "desc" };
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
  username: true,
  name: true,
  email: true,
  tel: true,
  //   password: true,
  level: true,
  department_id: true,
  is_active: true,
  department: {
    select: {
        id: true,
        code: true,
        name: true,
        is_active: true,
    },
  },
};

//Encrypting text
const encrypt = (text) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(text, salt);
  return hash;
};

const methods = {
  // ค้นหาทั้งหมด
  async onGetAll(req, res) {
    try {
      let $where = filterData(req);
      let other = await countDataAndOrder(req, $where);

      const item = await prisma.user.findMany({
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
      const item = await prisma.user.findUnique({
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
      const item = await prisma.user.create({
        data: {
          username: req.body.username,
          name: req.body.name,
          email: req.body.email,
          tel: req.body.tel,
          level: Number(req.body.level),
          department_id: Number(req.body.department_id),
          // password: req.body.password,
          is_active: Number(req.body.is_active),
          created_by: "arnonr",
          updated_by: "arnonr",
        },
      });

      res.status(201).json({ ...item, ...profile, msg: "success" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },

  // แก้ไข
  async onUpdate(req, res) {
    try {
      const item = await prisma.user.update({
        where: {
          id: Number(req.params.id),
        },

        data: {
          username: req.body.username != null ? req.body.username : undefined,
          name: req.body.name != null ? req.body.name : undefined,
          email: req.body.email != null ? req.body.email : undefined,
          tel: req.body.tel != null ? req.body.tel : undefined,
          level:req.body.level != null ? Number(req.body.level) : undefined,
          department_id:req.body.department_id != null ? Number(req.body.department_id) : undefined,
          is_active:req.body.is_active != null ? Number(req.body.is_active) : undefined,
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
      const item = await prisma.user.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          deleted_at: new Date().toISOString(),
        },
      });

      res.status(200).json(item);
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },

  async onLogin(req, res) {
    try {
      const item = await prisma.user.findFirst({
        select: { ...selectField, password: true },
        where: {
          email: req.body.email,
          //   password: req.body.password,
        },
      });

      if (item) {
        if (item.status == 1) {
          throw new Error("Not Confirm Email");
        }

        if (bcrypt.compareSync(req.body.password, item.password) == false) {
          throw new Error("Password Wrong");
        }

        const payload = item;
        const secretKey = process.env.SECRET_KEY;

        const token = jwt.sign(payload, secretKey, {
          expiresIn: "90d",
        });

        res.status(200).json({ ...item, token: token });
      } else {
        throw new Error("Invalid credential");
      }
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },

    async onSearchIcitAccount(req, res) {

        let config = {
            method: "post",
            url: "https://api.account.kmutnb.ac.th/api/account-api/user-info",
            headers: { Authorization: "Bearer " + process.env.ICIT_ACCOUNT_TOKEN },
            data: { username: req.body.username },
        };

        try {
            let response = await axios(config);
            console.log(response.data);
            // console.log(res);

            if (response.data.api_status_code == "201") {
                res.status(200).json(response.data.userInfo);
            } else if (response.data.api_status_code == "501") {
                res.status(404).json({ msg: response.data.api_message });
            }else{
                res.status(200).json(response.data);
            }
            // res.status(200);
        } catch (error) {
            res.status(400).json({ msg: error.message });
        }
    },

};

module.exports = { ...methods };

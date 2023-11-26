const express = require("express");
const router = express.Router();

const controllers = require("../../controllers/AssetController");

router.get("/", controllers.onGetAll);
router.get("/:id", controllers.onGetById);
router.post("/import-asset", controllers.onImportAsset);
router.post("/", controllers.onCreate);

router.post("/:id", controllers.onUpdate);

router.delete("/:id", controllers.onDelete);

module.exports = router;

const express = require("express");
// import api from './api/index.js' 
const user = require("./api/user");
const department = require("./api/department");
const budgetType = require("./api/budget-type");
const assetType = require("./api/asset-type");
// const froala = require("./api/froala");


const router = express.Router();

router.use(
  `/api/v${process.env.API_VERSION}`,
  // router.use("/user", user),
  router.use("/department", department),
  router.use("/budget-type", budgetType),  
  router.use("/asset-type", assetType),  
  // router.use("/news", news),
  // router.use("/news-type", newsType),
 
  // router.use("/froala", froala),
  // router.use("/news-gallery", newsGallery),
  
);

module.exports = router;

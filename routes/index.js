const express = require("express");
// import api from './api/index.js' 
const user = require("./api/user");
const profile = require("./api/profile");
const news = require("./api/news");
const newsType = require("./api/news-type");
const froala = require("./api/froala");
const newsGallery = require("./api/news-gallery");

const router = express.Router();

router.use(
  `/api/v${process.env.API_VERSION}`,
  router.use("/user", user),
  router.use("/profile", profile),
  router.use("/news", news),
  router.use("/news-type", newsType),
 
  router.use("/froala", froala),
  router.use("/news-gallery", newsGallery),
  
);

module.exports = router;

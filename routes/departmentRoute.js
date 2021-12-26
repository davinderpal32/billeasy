const express = require("express");
const router = express.Router();
const Libs = require(appRoot + "/libs");

const controllers = require(appRoot + "/controllers");

//API to add data into sales table
router.post("/add", /*[Libs.middleware.loginInRequired],*/ controllers.departmentController.add);

//API to fetch stats from the sales
router.get("/list", /*[Libs.middleware.loginInRequired],*/ controllers.departmentController.list);

module.exports = router;
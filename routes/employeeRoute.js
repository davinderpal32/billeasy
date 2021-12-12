const express = require("express");
const router = express.Router();

const controllers = require(appRoot + "/controllers");


//API to add Employee
router.post("/add", controllers.employeeController.add);
router.get("/list", controllers.employeeController.list);

module.exports = router;
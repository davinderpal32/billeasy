const Services = require(appRoot + "/services");
const Db = require(appRoot + "/models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


exports.add = async (request, response) => {
    try {
        let data = request.body;

        request.checkBody("name", ("name is required")).notEmpty();
        request.checkBody("email", ("email is required")).notEmpty();
        request.checkBody("department_id", ("department_id is required")).notEmpty();
        request.checkBody("salary", ("salary is required")).notEmpty();
        request.checkBody("joining_date", ("joining_date is required")).notEmpty();

        var errors = request.validationErrors();
        if (errors)
            return response.status(400).json({ success: 0, statusCode: 400, msg: errors[0].msg });

        //funcion to add sales
        let result = await Services.employeeServices.addEmployee(data);

        return response.status(200).json({ success: 1, statusCode: 200, msg: "Employee added successfully", result: result });
    }
    catch (e) {
        return response.status(500).json({ success: 0, statusCode: 500, msg: e.message });
    }
};

exports.list = async (request, response) => {
    try {
        let data = request.query;

        request.checkQuery("skip", ("skip is required")).notEmpty();
        request.checkQuery("limit", ("limit is required")).notEmpty();

        var errors = request.validationErrors();
        if (errors)
            return response.status(400).json({ success: 0, statusCode: 400, msg: errors[0].msg });

        data.limit = Number(data.limit)
        data.skip = Number(data.skip)
        //funcion to add sales
        let result = await Services.employeeServices.listofEmployees(data);

        return response.status(200).json({ success: 1, statusCode: 200, msg: "List of Employees", result });
    }
    catch (e) {
        return response.status(500).json({ success: 0, statusCode: 500, msg: e.message });
    }
};
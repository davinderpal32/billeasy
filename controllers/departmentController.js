
const Services = require(appRoot + "/services");
const Db = require(appRoot + "/models");
const moment = require("moment");
const libs = require(appRoot + "/libs");

exports.add = async (request, response) => {
    try {
        let data = request.body;

        request.checkBody("department_name", ("department_name is required")).notEmpty();

        var errors = request.validationErrors();
        if (errors)
            return response.status(400).json({ success: 0, statusCode: 400, msg: errors[0].msg });

        //funcion to add detartment

        let result = await Services.departmentServices.addDepartment(data);

        return response.status(200).json({ success: 1, statusCode: 200, msg: "department added successfully", result: result });
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
        let result = await Services.departmentServices.listofDepartments(data);

        return response.status(200).json({ success: 1, statusCode: 200, msg: "List of Employees", result });
    }
    catch (e) {
        return response.status(500).json({ success: 0, statusCode: 500, msg: e.message });
    }
};
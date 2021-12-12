
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
        let data = request.body;
        data.type = request.query.type;

        request.checkQuery("type", "type is required").notEmpty();

        var errors = request.validationErrors();
        if (errors)
            return response.status(400).json({ success: 0, statusCode: 400, msg: errors[0].msg });

        data.user_id = data.Details.user_id;

        let curr = moment(data.created_at).format("YYYY-MM-DD hh:mm:ss");

        data.end_dt = curr;
        let today = new Date;

        let allHours = [];
        let result = [];

        //for Daily report
        if (data.type == "1") {
            data.start_dt = moment(today).format("YYYY-MM-DD 00:00:00");
        }

        //for weekly report
        if (data.type == "2") {
            data.start_dt = moment(new Date(today.setDate(today.getDate() - today.getDay()))).format("YYYY-MM-DD 00:00:00");
        }

        //for monthly report
        if (data.type == "3") {
            data.start_dt = moment(new Date(today.getFullYear(), today.getMonth(), 1)).format("YYYY-MM-DD 00:00:00");

        }

        let salesData = await Services.salesServices.listofSales(data);
        let allDates = await libs.commonFunction.getDates(data.start_dt, data.end_dt)
        if (data.type == "1") {
            let nowHour = today.getHours();
            for (var i = 0; i < nowHour; i++) {
                allHours.push(i);  // Put loop counter into array with "00" next to it
            }
            for (const hour of allHours) {
                let totalAmount = 0;
                for (const sale of salesData) {
                    hr = new Date(moment.utc(sale.sale_on).format("YYYY-MM-DD hh:mm:ss")).getHours()
                    if (hour == hr) {
                        totalAmount = parseFloat(totalAmount) + parseFloat(sale.amount)
                    }
                }
                result.push({
                    hour: hour,
                    amount: totalAmount
                })
            }
        }
        if (data.type != "1") {
            if (allDates.length) {
                for (const allDate of allDates) {
                    let totalAmount = 0;
                    for (const sale of salesData) {
                        if (allDate == moment(sale.sale_on).format('YYYY-MM-DD')) {
                            totalAmount = parseFloat(totalAmount) + parseFloat(sale.amount)

                        }
                    }
                    result.push({
                        date: allDate,
                        amount: totalAmount
                    })
                }
            }
        }

        return response.status(200).json({ success: 1, statusCode: 200, msg: "List of Sales", result });
    }
    catch (e) {
        return response.status(500).json({ success: 0, statusCode: 500, msg: e.message });
    }
};
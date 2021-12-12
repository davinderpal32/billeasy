const Sequelize = require("sequelize");
const Promise = Sequelize.Promise;
const Op = Sequelize.Op;
const bcrypt = require("bcryptjs");
const Db = require(appRoot + "/models");

exports.listofEmployees = async (data) => {
    let where = {
        blocked: "0"
    }

    if (data.department_id) {
        where.department_id = data.department_id
    }
    if (data.name) {
        where.name = { [Op.like]: '%' + data.name + '%' }
    }
    if (data.start_date && data.end_date) {
        where.joining_date = { [Op.between]: [data.start_date, data.end_date] }
    }
    return Db.employees.findAll({
        where: where,
        attributes: ['employee_id', 'name', 'email', 'department_id', 'salary', 'joining_date'],
        include: [{
            model: Db.departments,
            attributes: ['department_name'],
            // where: where
        }],
        limit: data.limit,
        offset: data.skip
    });
}

exports.addEmployee = async (data) => {

    return await Db.employees.create(data);
}




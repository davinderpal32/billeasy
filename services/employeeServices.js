const Sequelize = require("sequelize");
const Promise = Sequelize.Promise;
const bcrypt = require("bcryptjs");
const Db = require(appRoot + "/models");

exports.listofEmployees = async (data) => {
    return Db.employees.findAll({
        where: {
            blocked: "0"
        },
        attributes :['employee_id','name','email','department_id','salary','joining_date'],
        include: [{
            model: Db.departments,
            attributes :['department_name']
        }]
    });
}

exports.addEmployee = async (data) => {

    return await Db.employees.create(data);
}




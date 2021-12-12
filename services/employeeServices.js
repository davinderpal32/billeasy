const Sequelize = require("sequelize");
const Promise = Sequelize.Promise;
const bcrypt = require("bcryptjs");
const Db = require(appRoot + "/models");

exports.listofEmployees = async (data) => {
    return Db.employees.findAll({
        where: {
            blocked: "0"
        }
    });
}

exports.addEmployee = async (data) => {
    
    return await Db.employees.create(data);
}





const Sequelize = require("sequelize");
const Promise = Sequelize.Promise;
const Op = Sequelize.Op;

const Db = require(appRoot + "/models");

exports.listofDepartments = async (data) => {
    let where = {
        blocked: "0"
    }
    return Db.departments.findAll({
        where: where,
        limit: data.limit,
        offset: data.skip
    });
}

exports.addDepartment = async (data) => {
    return await Db.departments.create(data);
}
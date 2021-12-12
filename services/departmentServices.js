
const Sequelize = require("sequelize");
const Promise = Sequelize.Promise;
const Op = Sequelize.Op;

const Db = require(appRoot + "/models");

exports.listofSales = async (data) => {
    return Db.sales.findAll({
        where: {
            user_id: data.user_id,
            blocked: "0",
            sale_on: {
                [Op.between]: [data.start_dt, data.end_dt]
            }
        },
        order: [["updatedAt", "DESC"]]
    })
}

exports.addDepartment = async (data) => {
    return await Db.departments.create(data);
}
"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const employees = sequelize.define("employees",
        {
            employee_id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
            name: { type: DataTypes.STRING(255), allowNull: true },
            email: { type: DataTypes.STRING(255), allowNull: true },
            department_id: { type: DataTypes.BIGINT, allowNull: true },
            salary: { type: Sequelize.BIGINT, allowNull: true },
            joining_date: { type: DataTypes.DATE, allowNull: true },
            blocked: { type: DataTypes.ENUM("0", "1"), allowNull: false, defaultValue: "0" }
        }, {
            timestamps: false
        }
    );

    employees.associate = function (models) {
        employees.belongsTo(models.departments, { foreignKey: "department_id", sourceKey: "department_id", onDelete: "cascade" });
    }

    return employees;
};
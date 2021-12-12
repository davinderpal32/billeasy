"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const departments = sequelize.define("	departments",
        {
            department_id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
            department_name: { type: DataTypes.STRING(500), allowNull: false },
            total_employee: { type: DataTypes.BIGINT, allowNull: false, defaultValue: "0" },
            blocked: { type: DataTypes.ENUM("0", "1"), allowNull: false, defaultValue: "0" }
        }
    );

    return departments;
};
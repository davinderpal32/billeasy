"use strict";
const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const departments = sequelize.define("departments",
        {
            department_id: { type: DataTypes.UUID, primaryKey: true, default: sequelize.fn('uuid_generate_v4') },
            department_name: { type: DataTypes.STRING(500), allowNull: false },
            total_employee: { type: DataTypes.BIGINT, allowNull: false, defaultValue: "0" },
            blocked: { type: DataTypes.ENUM("0", "1"), allowNull: false, defaultValue: "0" }
        }, {
            timestamps: false
        }
    );

    departments.associate = function (models) {
        departments.hasMany(models.employees, { foreignKey: "department_id", sourceKey: "department_id", onDelete: "cascade" });
    }

    return departments;
};

'use strict';

const Sequelize = require('sequelize');

let sequelize = require('../sqlcon').sequelize;

exports.vendors = sequelize.define('vendors', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    email: { type: Sequelize.STRING, defaultValue: null, unique: true },
    name: { type: Sequelize.STRING, allowNull: false },
    address: { type: Sequelize.STRING, allowNull: false },
    status: { type: Sequelize.TINYINT, defaultValue: 1},
    created_at: { type: Sequelize.DATE, defaultValue: null },
    updated_at: { type: Sequelize.DATE, defaultValue: null },
    created_by: { type: Sequelize.STRING, allowNull: false },
    updated_by: { type: Sequelize.STRING, allowNull: false }
},{freezeTableName: true} );
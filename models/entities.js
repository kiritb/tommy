'use strict';

const Sequelize = require('sequelize');

let sequelize = require('../sqlcon').sequelize;

exports.entities = sequelize.define('entities', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    vendor_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'vendors',
            key: 'id'
        },
        allowNull: false
    },
    name: { type: Sequelize.STRING, allowNull: false },
    code: { type: Sequelize.STRING, allowNull: false },
    type :{ type: Sequelize.STRING, allowNull: false },
    status: { type: Sequelize.TINYINT, defaultValue: 1},
    created_at: { type: Sequelize.DATE, defaultValue: null },
    updated_at: { type: Sequelize.DATE, defaultValue: null },
    created_by: { type: Sequelize.STRING, allowNull: false },
    updated_by: { type: Sequelize.STRING, allowNull: false }
},{freezeTableName: true} );
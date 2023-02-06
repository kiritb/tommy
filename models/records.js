'use strict';

const Sequelize = require('sequelize');

let sequelize = require('../sqlcon').sequelize;

exports.records = sequelize.define('records', {
    id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    entity_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'entities',
            key: 'id'
        },
        allowNull: false
    },
    col1: { type: Sequelize.STRING, allowNull: false },
    col2: { type: Sequelize.STRING, allowNull: false },
    col3: { type: Sequelize.STRING, allowNull: false },
    col4: { type: Sequelize.STRING, allowNull: false },
    status: { type: Sequelize.TINYINT, defaultValue: 1},
    created_at: { type: Sequelize.DATE, defaultValue: null },
    updated_at: { type: Sequelize.DATE, defaultValue: null },
    created_by: { type: Sequelize.STRING, allowNull: false },
    updated_by: { type: Sequelize.STRING, allowNull: false }
},{freezeTableName: true} );
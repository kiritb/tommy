const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.MYSQL_DB_NAME, process.env.MYSQL_USER_NAME, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    pool: {
        max: 20,
        min: 5,
        acquire: 300000,
        idle: 10000
    },
    operatorsAliases: 0,
    define: {
        timestamps: false
    }
});

module.exports = {
    sequelize: sequelize
};
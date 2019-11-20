const Sequelize = require('sequelize');
const sequelize = require('../db_connect');

const Survey = sequelize.define('survey',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    },
    description:Sequelize.STRING
});
module.exports = Survey;
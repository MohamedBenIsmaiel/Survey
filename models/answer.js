const Sequelize = require('sequelize');
const sequelize = require('../db_connect');

const Answer   = sequelize.define('answer',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    title:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports = Answer;
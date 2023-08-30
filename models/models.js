const { Sequelize,DataTypes } = require('sequelize');
const db = require('../config/db');
const moment = require('moment');

const Product = db.define('product',{
    id : {
        type : DataTypes.BIGINT,
        allowNull : false,
        primaryKey : true,
        autoIncrement : true
    },
    product_name : {
        type : DataTypes.STRING,
        allowNull : true
    },
    product_price : {
        type : DataTypes.INTEGER,
        allowNull : true
    },
    product_color : {
        type : DataTypes.STRING,
        allowNull : true
    },
    product_category : {
        type : DataTypes.STRING,
        allowNull : true
    },
    product_brand : {
        type : DataTypes.STRING,
        allowNull : true
    },
    product_qty : {
        type : DataTypes.INTEGER,
        allowNull : true
    },
    // image : {
    //     type : DataTypes.STRING,
    //     allowNull : false
    // },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        allowNull: false,
        field : 'createdAt'
    },
    updatedAt :{
        type: DataTypes.DATE,
        defaultValue: moment.utc().format('YYYY-MM-DD HH:mm:ss'),
        allowNull: false,
        field : 'updatedAt'
    }
});

module.exports = Product;
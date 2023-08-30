const Product = require('../models/models');
const APIError = require('../helpers/APIError');
const httpStatus = require('http-status');
const resPattern = require('../helpers/resPattern');
const { Op } = require('sequelize');

const createProduct = async (req,res,next) => {
    try {
        const requestData = req.body;
        const file = req.file;
        if(file){
            requestData.image = file
        }
        const result = await Product.create(requestData)
        const obj = resPattern.successPattern(httpStatus.OK,result,'success');
            return res.status(obj.code).json({
                ...obj
            });
    } catch (e) {
        console.log("e.",e);
        return next(new APIError(`${e.message}`,httpStatus.BAD_REQUEST,true));
    }
}

const getProducts = async (req,res,next) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : 15;
        const offset = req.query.offset ? parseInt(req.query.offset) : 0;

        const category = req.query.category;
        const brand = req.query.brand;
        const search = req.query.search;

let where = {};
if(category){
    where['product_category'] = category
}
if(brand){
    where['product_brand'] = brand
}
console.log("where..",where);

if(search !== undefined){
    where = {...where,
        [Op.or] : [
            {
                product_name : {[Op.like] : '%' + search + '%'} 
            }
        ]
    }
}
console.log("where..",where);

        const result = await Product.findAndCountAll({limit : limit,offset : offset, where : where});
        const obj = resPattern.successPattern(httpStatus.OK,result,'success');
            return res.status(obj.code).json({
                ...obj
            });
    } catch (e) {
        return next(new APIError(`${e.message}`,httpStatus.BAD_REQUEST,true));
    }
}

const findOneProduct = async (req,res,next) => {
    try {
        const id = req.params.id;
        const result = await Product.findOne({id : id});
        const obj = resPattern.successPattern(httpStatus.OK,result,'success');
        return res.status(obj.code).json({
            ...obj
        });
    } catch (e) {
        return next(new APIError(`${e.message}`,httpStatus.BAD_REQUEST,true));
    }
}

const updateProduct = async(req,res,next) => {
    try {
        const id = req.params.id;
        const requestData = req.body;
        const result = await Product.update(requestData,{where : { id : id}});
        const obj = resPattern.successPattern(httpStatus.OK,result,'success');
        return res.status(obj.code).json({
            ...obj
        });
    } catch (e) {
        return next(new APIError(`${e.message}`,httpStatus.BAD_REQUEST,true));
    }
}

const deleteProduct = async(req,res,next) => {
    try {
        const id = req.params.id;
        await Product.destroy({where : {id : id}})
        const obj = resPattern.successPattern(httpStatus.OK,{"message" : "Delete Product successfully...!"},'success');
        return res.status(obj.code).json({
            ...obj
        });
    } catch (e) {
        return next(new APIError(`${e.message}`,httpStatus.BAD_REQUEST,true));
    }
}

const imageUpload = async (req,res,next) => {
    try {
        const file = req.file;
        console.log("file..",req.file);
        if(!file){
            const message = "File Not Found";
            return res.status(httpStatus.BAD_REQUEST).json({ error: { message } });
        }

        const resdata = {
            file : file.location
        }
        let obj = resPattern.successPattern(httpStatus.OK, resdata, 'success');
        return res.status(obj.code).json(obj);
    } catch (e) {
        return next(new APIError(`${e.message}`,httpStatus.BAD_REQUEST,true));
    }
}
module.exports = {
    createProduct,
    getProducts,
    findOneProduct,
    updateProduct,
    deleteProduct,
    imageUpload
}
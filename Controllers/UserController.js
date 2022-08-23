var express = require('express');
const mongoose = require("mongoose");
const PasswordEncrypterClass = require('../Functions/PasswordEncrypter');
var User = require('../models/User');

class UserController {

    static async list(req){
        let query = {isDeleted: false}
        var sortObject = {}
        if(req.query.searchText){
            query = Object.assign(query,{categoryName: {'$regex': '.*'+req.query.searchText+'.*' , '$options':'$i'}})
        }
        let options = {
            sort: sortObject,
            lean: true,
            populate:  ['shopId'],
            page: parseInt(req.headers["page"]),
            limit: parseInt(req.headers["limit"]),
        };            
        return await Category.paginate(query, options)
    }

    static async object(req){
        let query = {}
        query = req.query._id!=null?{_id: req.query._id}:query
        return await Category.findOne(query)
    }

    static async create(req) {
        req.body.password = PasswordEncrypterClass.encrypt(req.body.password)
        const data = new User(req.body)
        return await data.save()
    }

    static async update(req){
        await Category.updateOne({ _id: req.body._id }, {
            $set: req.body
        })
    }

    static async delete(req){
      return await Category.updateOne({ _id: req.query._id }, {
            $set: {
                isDeleted: true
            }
        })
    }

    static async deletePermanently(req){
        return await Category.deleteOne({ _id: req.query._id })
    }
}
module.exports = UserController;


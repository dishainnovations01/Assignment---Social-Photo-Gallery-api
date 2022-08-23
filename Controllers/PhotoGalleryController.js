var express = require('express');
const mongoose = require("mongoose");
const PhotoGallery = require('../models/PhotoGallery');

class PhotoGalleryController {

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
        return await PhotoGallery.paginate(query, options)
    }

    static async object(req){
        let query = {}
        query = req.query._id!=null?{_id: req.query._id}:query
        return await PhotoGallery.findOne(query)
    }

    static async create(req) {
        const data = new PhotoGallery(req.body)
        return await data.save()
    }

    static async update(req){
        await PhotoGallery.updateOne({ _id: req.body._id }, {
            $set: req.body
        })
    }

    static async delete(req){
      return await PhotoGallery.updateOne({ _id: req.query._id }, {
            $set: {
                isDeleted: true
            }
        })
    }

    static async deletePermanently(req){
        return await PhotoGallery.deleteOne({ _id: req.query._id })
    }
}
module.exports = PhotoGalleryController;


var express = require('express');
const mongoose = require("mongoose");
const LikedImages = require('../models/LikedImages');
const { singleobjectphotogallery } = require('./PhotoGalleryController');

class ImageLikeDislikeController {

    static async list(req){
        let query = {isDeleted: false}
        var sortObject = {}
        if(req.query.searchText){
            query = Object.assign(query,{categoryName: {'$regex': '.*'+req.query.searchText+'.*' , '$options':'$i'}})
        }
        let options = {
            sort: sortObject,
            lean: true,
            page: parseInt(req.headers["page"]),
            limit: parseInt(req.headers["limit"]),
        };            
        return await LikedImages.paginate(query, options)
    }

    static async object(req){
        let query = {}
        query = req.query._id!=null?{_id: req.query._id}:query
        return await Category.findOne(query)
    }

    static async create(req) {
        var findData = await LikedImages.findOne({imageId: req.body.imageId,userId: req.body.userId})
        findData = JSON.parse(JSON.stringify(findData))
        if(findData){
            if(req.body.like){
                req.body.dislike = false
            }else if(req.body.dislike){
                req.body.like = false
            }
            await LikedImages.updateOne({ _id: findData._id }, {
                $set: req.body
            })
            return await singleobjectphotogallery(req.body.imageId,req.body.userId)
        }else{
            const data = new LikedImages(req.body)
            var savedata = await data.save()
            return await singleobjectphotogallery(savedata._id,req.body.userId)

        }
    }

}
module.exports = ImageLikeDislikeController;


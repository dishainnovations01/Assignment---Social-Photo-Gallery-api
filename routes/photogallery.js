const express = require('express')
const router = express.Router();
const User = require('../models/User')
const path = require('path')
const fs = require('fs')
const UploaderClass = require('../Functions/UploaderClass');
const PhotoGalleryController = require('../Controllers/PhotoGalleryController');
const PhotoGallery = require('../models/PhotoGallery');
const { default: mongoose } = require('mongoose');
const ImageLikeDislikeController = require('../Controllers/ImageLikeDislikeController');


// fetch all..
router.get('/byuser', async (req, res) => {
    try {
        var data = await PhotoGalleryController.list(req)
        res.json(data)
    }
    catch (err) {
        res.status(420).send({ message: err.toString() })
    }
})

router.post("/", async (req, res) => {
    try {
        if (req.body.image) {
            req.body.image = await UploaderClass.uploadFile(req.body.image)
        }
        var data = await PhotoGalleryController.create(req)
        res.json(data)
    } catch (err) {
        res.status(420).send({ message: err.toString() });
    }
});

// fetch all..
router.get('/byid', async (req, res) => {
    try {
        //   if (req.headers["auth-key"] == process.env.AUTH_KEY) {
        var data = await Customer.findById(req.query._id)
        res.json(data)
        //   } else {
        //     res.status(401).send({ message: "unauthorised" });
        //   }
    }
    catch (err) {
        res.status(420).send({ message: 'Error' })
    }
})

router.patch("/update", async (req, res) => {
    try {
        // if (req.headers["auth-key"] == process.env.AUTH_KEY) {
        var data = await User.updateOne({ _id: req.body._id }, {
            $set: req.body
        })
        var resdata = await User.findOne({ _id: req.body._id })
        res.json(resdata)
        // } else {
        //     res.status(401).send({ message: "unauthorised" })
        // }
    } catch (err) {
        res.status(420).send({ message: err });
    }
});

// update profile image
router.delete("/", async (req, res) => {
    try {
        var deletedata = await PhotoGalleryController.deletePermanently(req)
        var deletedata = await ImageLikeDislikeController.deletePermanently(req.query._id)
        res.json({ message: "Deleted Succesfully" })

    } catch (err) {
        res.status(420).send({ message: err.toString() });
    }
});

module.exports = router
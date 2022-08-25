const express = require('express')
const router = express.Router();
const User = require('../models/User')
const path = require('path')
const fs = require('fs')
const ImageLikeDislikeController = require('../Controllers/ImageLikeDislikeController');

router.post("/", async (req, res) => {
  try {
    var data = await ImageLikeDislikeController.create(req)
    // console.log(data)
    res.json(data[0])
  } catch (err) {
    res.status(420).send({ message: err.toString() });
  }
});

module.exports = router
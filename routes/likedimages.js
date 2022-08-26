const express = require('express')
const router = express.Router();
const User = require('../models/User')
const path = require('path')
const fs = require('fs')
const ImageLikeDislikeController = require('../Controllers/ImageLikeDislikeController');
const WebSocketServer = require('ws');

router.post("/", async (req, res) => {
  try {
    var data = await ImageLikeDislikeController.create(req)

    const socket = new WebSocketServer('ws://localhost:8081');

    // Connection opened
    socket.addEventListener('open', function (event) {
      socket.send(JSON.stringify(data[0]));
    });
    

    res.json(data[0])
  } catch (err) {
    res.status(420).send({ message: err.toString() });
  }
});

module.exports = router
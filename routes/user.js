const express = require('express')
const router = express.Router();
const User = require('../models/User')
const path = require('path')
const fs = require('fs')
const UploaderClass = require('../Functions/UploaderClass');
const UserController = require('../Controllers/UserController');


router.post("/", async (req, res) => {
  try {
    if (req.body.profileImage) {
      req.body.profileImage = await UploaderClass.uploadFile(req.body.profileImage)
    }
    var data = await UserController.create(req)
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
router.patch("/updateprofile", async (req, res) => {
  try {
    if (req.headers["auth-key"] == process.env.AUTH_KEY) {
      var logoImage = null;
      if (req.body.profileImage) {
        //   const uploaderclass = new UploaderClass();
        logoImage = await UploaderClass.uploadFile(req.body.profileImage);
      }
      const dataUpdate = await User.updateOne({ _id: req.body._id }, {
        $set: {
          profileimage: logoImage
        }
      })

      var finddata = await User.findById(req.body._id)
      res.json(finddata)
    } else {
      res.status(401).send({ message: "unauthorised" });
    }
  } catch (err) {
    res.status(420).send({ message: err });
  }
});

module.exports = router
'use strict'
const express = require('express'),
      router = express.Router(),
      images = require('../helpers/images')
// const ItemModel = require("../models/item")      

// const Item = require('../controllers/item_controller.js')
/* GET main endpoint. */
router.get('/', (req, res, next) => {
  res.send({ message: 'Welcome Buddy!' })
}) 
router.post('/upload',
  images.multer.single('music'), 
  images.sendUploadToGCS,
  Music.add
    // res.send({
    //   status: 200,
    //   message: 'Your file is successfully uploaded',
    //   link: req.file.cloudStoragePublicUrl
    // })
  )

router.post('/add',Item.add)

module.exports = router

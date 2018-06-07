'use strict'
const express = require('express'),
      router = express.Router(),
      musics = require('../helpers/musics')

const Music = require('../controllers/music_controller.js')

const {
  loginCheck
} = require('../middlewares/auth')

/* GET main endpoint. */
router.get('/', (req, res, next) => {
  res.send({ message: 'Welcome Buddy!' })
})

router.post('/upload',
  loginCheck,
  musics.multer.single('url'),
  musics.sendUploadToGCS,
  Music.upload
  // (req,res)=>
  //   res.send({
  //     status: 200,
  //     message: 'Your file is successfully uploaded',
  //     title : req.body.title,
  //     link: req.file.cloudStoragePublicUrl
  //   })
  )
router.get('/get', loginCheck, Music.getMusic)
router.get('/list', Music.musicList)


module.exports = router

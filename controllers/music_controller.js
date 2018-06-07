const MusicModel = require("../models/music")
const jwt = require('jsonwebtoken')

class Music {
	static upload(req,res) {
		// const token = jwt.decode(req.body.userId)
		console.log(req.body,req.file.cloudStoragePublicUrl)
		MusicModel.create( {
			title: req.body.title,
			url: req.file.cloudStoragePublicUrl,
			// user: req.decoded.id
		})
	    .then((data)=>{
	      res.status(200).json({message:"your file uploaded successfully",data})
	    })
	    .catch(err=>{
	      res.status(500).send(err)
	    })
	 // console.log(req.file.cloudStoragePublicUrl)
	}

	static getMusic(req, res) {
		MusicModel.find({
			user: req.decoded.id
		})
		.populate('user')
		.then(data => {
			res.status(200).json({message:"success retrieve data",data})
		})
		.catch(err => {
			res.status(500).send(err)
		})
	}

	static musicList(req, res) {
		MusicModel.find()
		.then(musics => {
			res.status(200).json({message:"success retrieve data",musics})
		})
		.catch(err => {
			res.status(500).send(err)
		})
	}

}


module.exports = Music

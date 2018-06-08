const MusicModel = require("../models/music")
const jwt = require('jsonwebtoken')

class Music {
	static upload(req,res) {
		// const token = jwt.decode(req.body.userId)
		// console.log(req.body,req.file.cloudStoragePublicUrl)
		MusicModel.create( {
			title: req.body.title,
			artist: req.body.artist,
			url: req.file.cloudStoragePublicUrl,
			user: req.decoded.id
		})
	    .then((data)=>{
	      res.status(200).json({message:"your file uploaded successfully",data})
	    })
	    .catch(err=>{
				console.log(err);
	      res.status(500).send(err)
	    })

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

	static deleteSong (req, res) {
		MusicModel.findOneAndRemove({ _id : req.params.id }, (err, success) => {
			if (err) {
				res.status(404).json('bad request')
			} else {
				res.status(200).json('success delete song')
			}
		})
	}

}


module.exports = Music

const MusicModel = require("../models/music.js")
const jwt = require('jsonwebtoken')

class Music {

	static upload(req,res) {
		// const token = jwt.decode(req.body.userId)
		console.log(req.body,req.file.cloudStoragePublicUrl)
		MusicModel.create( {
			title: req.body.title,
	      	url: req.file.cloudStoragePublicUrl,
	     	userId: req.body.userId
		})
	    .then((data)=>{
	      res.status(200).json({message:"your file uploaded successfully",data})
	    })
	    .catch(err=>{
	      res.status(500).send(err)
	    })
	 // console.log(req.file.cloudStoragePublicUrl)
	}
	

}


module.exports = Music

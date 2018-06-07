const User = require("../models/user");
const jwt = require ("jsonwebtoken");

exports.getUsers = function(req,res){
    User.find({})
    .then(function(users){
        res.status(200)
        .send({
            message: "Here are the name of the users: ",
            users
        })
    })
    .catch(function(err){
        res.status(409)
        .send({
            message: err.message
        })
    })
}

exports.signUp = function(req,res){
    let {email, username, password} = req.body;
    console.log(req.body);
   User.create({
       email,
       username,
       password,
   })
   .then(function(){
        User.find({})
        .then(function(user){
            res.status(201)
            .send({
                message: "User data has been created",
                user,
            })
        })
        .catch(function(err){
            res.status(409)
            .send({
                message:  err.message
            })
        })
   })
   .catch(function(err){
       console.log("masuk error");
        res.status(409)
        .send({
            message: err.message
        })
    })
}



exports.signIn = function (req, res){
    let {email, password} = req.body;
    console.log(typeof email);
    User.findOne({email: email})
    .then(function(user){

       user.comparePassword(password, function(err, isMatch){
           if(err){
               res.status(404)
               .send({
                   message: err.message
               })
           }
           else{
               if(isMatch){
                    let token = jwt.sign({
                        id: user._id,
                    }, process.env.secretKey)

                    res.status(200).send({
                        token: token,
                        user: user
                    });
               }
               else{
                    res.status(400).send({
                        message: "Wrong Password!"
                    })
               }
           }
       });
    })
    .catch(function(err){
        res.status(404).send({
            message: "Email not found!"
        })
    })
}

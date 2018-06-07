const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt')
const saltRounds = 10;

const userSchema = new Schema ({
    username: {
        type: String,
        required: "Please fill in name",
        unique: true,
    },
    email:{
        type: String,
        required: "Please put in a valid email",
        validate: {
            validator: function(value){
                let validate =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return validate.test(value);
            },
            message: "Invalid Email. Please try again following this format: example@emailProvider.com"
        },
        unique: true
    },
    password: {
        type: String,
        required: "Please put in your password",
        min: [7, 'Password too short!'],
        validate: {
            validator: function(value) {
                let validate = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/;
                return validate.test(value);
            },
            message: 'Password needs to include at least 1 number, 1 special character, 1 lowercase, and 1 uppercase letter!'
          },
        unique: true
    }
    
}, {timestamps: true})

userSchema.pre('save', function(next) {
    var user = this;
    console.log("masuk sini bcrypt")
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(saltRounds, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            console.log("masuk hash");
            
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};


const User = mongoose.model("Users", userSchema);

module.exports = User;
const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const musicSchema = new Schema ({
    name: {
        type: String,
        required: "Please fill in name",
        unique: true,
    },
    url: {
        type: String,
        required: "Please put in your file",
        unique: true
    }
    
}, {timestamps: true})

musicSchema.pre('save', function(next) {
    this.name = Date.now +"-"+ this.name;
});


const Music = mongoose.model("Music", musicSchema);

module.exports = Music;
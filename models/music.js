const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const musicSchema = new Schema ({
    title: {
        type: String,
        required: "Please fill in name"
        
    },
    url: {
        type: String,
        required: "Please put in your file"
        
    },
    user: {
        type: Schema.Types.ObjectId, 
        ref: 'user' 
    }
    
}, {timestamps: true})

// musicSchema.pre('save', function(next) {
//     this.name = Date.now +"-"+ this.name;
// });


const Music = mongoose.model("Music", musicSchema);

module.exports = Music;
const mongoose = require ("mongoose");
const Schema = mongoose.Schema;
// const ObjectId = ==>jangan lupa diisi

const musicSchema = new Schema ({
    title: {
        type: String,
        required: "Please fill in name"
        
    },
    url: {
        type: String,
        required: "Please put in your file"
        
    },
    userId: {
        type: [{ type: Schema.Types.ObjectId, ref: 'User' }]
    }
    
}, {timestamps: true})

// musicSchema.pre('save', function(next) {
//     this.name = Date.now +"-"+ this.name;
// });


const Music = mongoose.model("Music", musicSchema);

module.exports = Music;
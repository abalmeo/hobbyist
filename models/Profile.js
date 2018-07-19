const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

//Profile Schema 
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    userName: {
        type: String,
        required: true,
        max: 30
    },
    location: {
        type: String,
        required: false,
        max: 30
    },
    bio: {
        type: String,
        required: false
    },
    skills: {
        type: [String],
        required: true
    },
    equipment: {
        type: [String],
    },
    interests: {
        type: [String],
        required: true
    },
    occupation: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.Now
    }
})

module.exports = Profile = mongoose.model('profile', ProfileSchema); 
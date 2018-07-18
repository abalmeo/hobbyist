const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

//User Schema 
const UserSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

    UserSchema.virtual('profile', {
        ref: 'profile', // The model to use
        localField: 'user', // Find people where `localField`
        foreignField: "id", // is equal to `foreignField`
        // If `justOne` is true, 'members' will be a single doc as opposed to
        // an array. `justOne` is false by default.
        justOne: true
    });

module.exports = User = mongoose.model('users', UserSchema); 
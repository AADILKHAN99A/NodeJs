const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    }, email: {
        type: String,
        unique: true,
        required: true
    }, gender: {
        type: String,
    }
}, { timestamps: true });



const User = mongoose.model('user', userSchema);

module.exports = User;
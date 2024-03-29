const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    birthDate: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        unique: true
    },
    houses: {
          type: Schema.Types.ObjectId,
          ref: 'House'
    }
});

module.exports = mongoose.model('User', userSchema);
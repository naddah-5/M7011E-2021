const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const prosumerSchema = new Schema({

    production: {
        type: Number,
        required: true
    },
    netProduction: {
        type: Number,
        required: true
    },
    buffer: {
        type: Number,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
    
  },
  {timestamps: true}
);

module.exports = mongoose.model('Prosumer', prosumerSchema);
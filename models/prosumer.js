const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const prosumerSchema = new Schema({
    
    simulatorEvent: {
        type: Schema.Types.ObjectId,
        ref: 'SimulatorEvent'
    },
    user: {
        type: String,
        required: true
    },
    production: {
        type: Number,
        default: 0
    },
    netProduction: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('Prosumer', prosumerSchema);
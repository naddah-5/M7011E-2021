const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const houseSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    //note that this is supposed to be the owners prosumer ID not the name
    owner: {
        type: String,
        required: true
    },
    windTurbineId: {
        type: String
    },
    batteryId: {
        type: String
    },
    consumption: {
        type: Number,
        default: 100
    },
    minConsumption: {
        type: Number,
        default: 0
    },
    maxConsumption: {
        type: Number,
        default: 1000
    }
})

module.exports = mongoose.model("House", houseSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const houseSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    windTurbineId: {
        type: Schema.Types.ObjectId,
        ref: "WindTurbine"
    },
    batteryId: {
        type: Schema.Types.ObjectId,
        ref: "Battery"
    },
    consumption: {
        type: Number,
    },
    minConsumption: {
        type: Number,
    },
    maxConsumption: {
        type: Number,
    }
})

module.exports = mongoose.model("House", houseSchema);
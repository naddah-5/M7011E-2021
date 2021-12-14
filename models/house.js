const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const houseSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
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
        default: 50
    },
    minConsumption: {
        type: Number,
        default: 0
    },
    maxConsumption: {
        type: Number,
        default: 100
    }
})

module.exports = mongoose.model("House", houseSchema);
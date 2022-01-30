const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var min = [0, 'The value of path `{PATH}` ({VALUE}) is beneath the limit ({MIN}).'];
var max = [1, 'The value of path `{PATH}` ({VALUE}) exceeds the limit ({MAX}).'];

const houseSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    windTurbineID: {
        type: Schema.Types.ObjectId,
        ref: 'WindTurbine'
    },
    batteryID: {
        type: Schema.Types.ObjectId,
        ref: 'Battery'
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
    },
    buyRatio: {
        type: Number,
        default: 0,
        min: min,
        max: max
    },
    sellRatio: {
        type: Number,
        default: 0,
        min: min,
        max: max
    },
    production: {
        type: Number,
        default: 0
    },
    netProduction: {
        type: Number,
        default: 0
    },
    blockTime: {
        type: Number,
        default: 0
    },
    region: {
        type: String,
        default: "Luleå"
    }
})

module.exports = mongoose.model("House", houseSchema);
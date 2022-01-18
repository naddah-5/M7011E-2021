const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const regionSchema = new Schema({
    name: {
        type: String,
        default: "Luleå"
    },
    temperature: {
        type: Number,
        default: 0
    },
    windSpeed: {
        type: Number,
        default: 0
    },
    //electricity currently in the grid and available.
    gridCapacity: {
        type: Number,
        default: 0
    },
    //maximum amount of electricity that can be handled by the grid for one unit of time.
    maxGridCapacity: {
        type: Number,
        default: 10000000000
    },
    //the amount of electricity that was used in last time unit.
    gridDemand: {
        type: Number,
        default: 0
    },
})

module.exports = mongoose.model("Region", regionSchema);
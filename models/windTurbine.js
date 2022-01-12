const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const windTurbineSchema = new Schema({
    ownerID: {
        type: String,
        required: true
    },
    houseID: {
        type: String,
        required: true
    },
    efficiency: {
        type: Number,
        //maximum efficiency according to bentz law
        default: 0.593
    },
    /*
    this multiplier is to be used for implementing multiple wind turbines
    if a wind turbine is created on a house that already have on just increment this number.
    */
    quantity: {
        type: Number,
        default: 1
    }
});

module.exports = mongoose.model("WindTurbine", windTurbineSchema);
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
    }
});

module.exports = mongoose.model("WindTurbine", windTurbineSchema);
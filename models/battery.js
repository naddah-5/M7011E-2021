const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const batterySchema = new Schema({
    houseID: {
        type: String,
        required: true
    },
    capacity: {
        type: Number,
        default: 0
    },
    maxCapacity: {
        type: Number,
        default: 100
    }
})

module.exports = mongoose.model("Battery", batterySchema);
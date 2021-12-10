const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const powerPlantSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    region: {
        type: String,
        default: "Norrbotten"
    },
    capacity: {
        type: Number,
        default: 100000
    },
    minProduction: {
        type: Number,
        default: 0
    },
    maxProduction: {
        type: Number,
        default: 1000000
    },
    status: {
        type: String,
        default: "Active"
    },
    downtimeRemaining: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model("PowerPlant", powerPlantSchema);
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const batterySchema = new Schema({
    house: {
        type: Schema.Types.ObjectId,
        ref: "House"
    },
    capacity: {
        type: Number,
        default: 100
    }
})

module.exports = mongoose.model("Battery", batterySchema);
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const windTurbineSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    house: {
        type: Schema.Types.ObjectId,
        ref: "House"
    },
    efficiency: {
        type: Number,
        //maximum efficiency according to bentz law
        default: 0.593
    }
});

module.exports = mongoose.model("WindTurbine", windTurbineSchema);
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const windTurbineSchema = new Schema({

});

module.exports = mongoose.model("WindTurbine", windTurbineSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const simulatorSchema = new Schema({
    windSpeed: {
        type: Number,
        required: true
    },
    electricityDemand: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
   
  },
  {timestamps: true}
);

module.exports = mongoose.model('SimulatorEvent', simulatorSchema);

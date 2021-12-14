const authenticationResolver = require('./auth');
const simEventsResolver = require('./simulatorEvents');
const prosumerResolver = require('./prosumer');
const houseResolver = require("./house")
const windTurbineResolver = require("./windTurbine");
const batteryResolver = require("./battery")

const roootResolver = {
    ...authenticationResolver,
    ...simEventsResolver,
    ...prosumerResolver,
    ...houseResolver,
    ...windTurbineResolver
};

module.exports = roootResolver;
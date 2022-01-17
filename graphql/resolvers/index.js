const authenticationResolver = require('./auth');
const simEventsResolver = require('./simulatorEvents');
const houseResolver = require('./house');
const windTurbineResolver = require('../../models/windTurbine');
const batteryResolver = require('../../models/battery');

const roootResolver = {
    ...authenticationResolver,
    ...simEventsResolver,
    ...houseResolver,
    ...windTurbineResolver,
    ...batteryResolver
};

module.exports = roootResolver;
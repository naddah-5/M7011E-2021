const authenticationResolver = require('./auth');
const simEventsResolver = require('./simulatorEvents');
const houseResolver = require('./house');
const windTurbine = require('../../models/windTurbine');

const roootResolver = {
    ...authenticationResolver,
    ...simEventsResolver,
    ...houseResolver,
    ...windTurbine
};

module.exports = roootResolver;
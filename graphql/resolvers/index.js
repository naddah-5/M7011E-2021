const authenticationResolver = require('./auth');
const simEventsResolver = require('./simulatorEvents');
const prosumerResolver = require('./prosumer');
const houseResolver = require('./house');

const roootResolver = {
    ...authenticationResolver,
    ...simEventsResolver,
    ...prosumerResolver,
    ...houseResolver
};

module.exports = roootResolver;
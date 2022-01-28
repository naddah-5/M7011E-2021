const SimulatorEvent = require('../../models/simulatorEvent');
const User = require('../../models/user');
const {returnSimEvent} = require('./helper');


module.exports = {
    simEvents: async (req) => {
        //if(!req.isAuth) {
            //throw new Error('Not authorized!');
        //}
        try {
            const simEvent = await SimulatorEvent.findOne({sort: {'createdAt' : -1}})
            return returnSimEvent(simEvent);
        } catch(err) {
            throw err;
        }
    },
    createSimEvent: async (args) => {
        const simulatorEvent = new SimulatorEvent({
            windSpeed: +args.simulatorEventInput.windSpeed,
            electricityDemand: +args.simulatorEventInput.electricityDemand,
            price: +args.simulatorEventInput.price,
            date: new Date(args.simulatorEventInput.date),
        });
        let createdEvent;
        try {
            const result = await simulatorEvent.save()
      
            createdEvent = returnSimEvent(result);
            return createdEvent;
        } catch(err) {
            throw err;
        }
    }
}
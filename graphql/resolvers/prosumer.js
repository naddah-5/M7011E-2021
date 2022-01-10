const Prosumer = require('../../models/prosumer');
const SimulatorEvent = require('../../models/simulatorEvent');
const {returnProsumerEvent} = require('./helper');


module.exports = {
    prosumerEvents: async (req) => {
        //if(!req.isAuthenticated) {
            //throw new Error('Not authorized!');
        //}
        try {
            const prosumerEvent = await Prosumer.findOne({sort: {'createdAt' : -1}})
            //return returnProsumerEvent(prosumerEvent);
            return {...prosumerEvent._doc
            };
        } catch(err) {
            throw err;
        }
    },
    createProsumer: async (args) => {
        const prosumer = new Prosumer({
            production: +args.prosumerInput.production,
            netProduction: +args.prosumerInput.netProduction,
            buffer: +args.prosumerInput.buffer,
        });
        let createdProsumerEvent;
        try {
            const result = await prosumer.save()
      
            createdProsumerEvent = returnProsumerEvent(result);

            return createdProsumerEvent;
        } catch(err) {
            throw err;
        }        
    }
    /*prosumerSimEvents: async (req) => {
        if(!req.isAuthenticated) {
            throw new Error('Not authorized!');
        }
        try {
            const prosumerSimEvents = await Prosumer.find();
            return prosumerSimEvents.map(simEvent => {
                return {...simEvent._doc,
                    id: simEvent.id,
                    simulatorEvent: singleSimEvent.bind(this,simEvent._doc.simulatorEvent),
                    user: user.bind(this, simEvent._doc.user) 
                };
            });
        } catch(err) {
            throw err;
        }
    }, 
    deleteProsumerSimEvent: async (args,req) => {
        if(!req.isAuthenticated) {
            throw new Error('Not authorized!');
        }
        try {
            const deleteSimEvent = await Prosumer.findById(args.prosumerId).populate('simulatorEvent');
            const simulatorEvent = returnSimEvent(deleteSimEvent.simulatorEvent);
            await Prosumer.deleteOne({_id: args.consumerId});
            return simulatorEvent;
        } catch(err) {
            throw err;
        }  
    }, */

}; 
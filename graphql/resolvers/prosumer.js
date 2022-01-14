const Prosumer = require('../../models/prosumer');
const {returnProsumerEvent} = require('./helper');
const User = require('../../models/user');


module.exports = {
    prosumerEvents: async (req) => {
        if(!req.isAuthenticated) {
            throw new Error('Not authorized!');
        }
        try {
            const prosumerEvent = await Prosumer.findOne({user: req.userId})
            return returnProsumerEvent(prosumerEvent);
        } catch(err) {
            throw err;
        }
    },
    createProsumer: async (args,req) => {
        
        const prosumer = new Prosumer({
            production: +args.prosumerInput.production,
            netProduction: +args.prosumerInput.netProduction,
            buffer: +args.prosumerInput.buffer,
            user: args.prosumerInput.user
        });
        let createdProsumer;
        try {
            const result = await prosumer.save()
      
            createdProsumer = returnProsumerEvent(result);
            
            const user = await User.findById(args.prosumerInput.user);
      
            if(!user) {
                throw new Error('User does not exist')
            }
            user.prosumers = prosumer;
            
            await user.save();
            return createdProsumer;
        } catch(err) {
            throw err;
        }
    }
}; 
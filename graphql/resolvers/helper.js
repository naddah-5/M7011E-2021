const SimulatorEvent = require('../../models/simulatorEvent');
const Prosumer = require('../../models/prosumer');
const User = require('../../models/user');



const returnSimEvent = simulatorEvent => {
    return {...simulatorEvent._doc, 
        _id: simulatorEvent.id,
        date: new Date(simulatorEvent._doc.date).toISOString()};
};

const prosumersRet = async prosumerId => {
    try {
        const prosumers_ = await Prosumer.findById(prosumerId);
        
        return returnProsumerEvent(prosumers_);
  } catch(err) {
      throw err;
  }
};

const user = async userId => {
    try {
        const user = await User.findById(userId)
        return {...user._doc,
            _id: user.id,
            prosumers: prosumersRet.bind(this, user._doc.prosumers)};     
    }
    catch(err) {
        throw err;
    }
};

const returnProsumerEvent = prosumer => {
    return {...prosumer._doc, 
        _id: prosumer.id,
        user: user.bind(this, prosumer.user)};
};

const singleSimEvent = async eventId => {
    try {
        const event = await SimulatorEvent.findById(eventId);
        return returnSimEvent(event);
    } catch(err) {
        throw err;
    }
}; 

exports.user = user;
exports.singleSimEvent = singleSimEvent;
exports.returnSimEvent = returnSimEvent;
exports.returnProsumerEvent = returnProsumerEvent;

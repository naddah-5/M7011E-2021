const SimulatorEvent = require('../../models/simulatorEvent');
const House = require('../../models/house');
const User = require('../../models/user');



const returnSimEvent = simulatorEvent => {
    return {...simulatorEvent._doc, 
        _id: simulatorEvent.id,
        date: new Date(simulatorEvent._doc.date).toISOString()};
};

const housesRet = async houseId => {
    try {
        const houses_ = await House.findById(houseId);
        
        return returnHouse(houses_);
  } catch(err) {
      throw err;
  }
};

const user = async userId => {
    try {
        const user = await User.findById(userId)
        return {...user._doc,
            _id: user.id,
            houses: housesRet.bind(this, user._doc.houses)};     
    }
    catch(err) {
        throw err;
    }
};

const returnHouse = house => {
    return {...house._doc, 
        _id: house.id,
        owner: user.bind(this, house.owner)};
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
exports.returnHouse = returnHouse;

const WindTurbine = require("../../models/windTurbine");
const House = require("../../models/house");
const User = require("../../models/user");

module.exports = {
    createTurbine: async (args, req) => {
        if(!req.isAuthenticated){
            throw new Error("Not authorized");
        }
        try {
            const fetchedUser = await User.findOne({_id: req.windTurbineInput.ownerID})
            const fetchedHouse = await House.findOne({ownerID: req.windTurbineInput.ownerID, address: req.windTurbineInput.address});
            if(!fetchedHouse || !fetchedUser){
                throw new Error ("Could not find specified house or user.");
            }
            
        }
        catch(e) {
            throw (e);
        }
    }
};
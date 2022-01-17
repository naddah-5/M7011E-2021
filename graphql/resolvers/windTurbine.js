const WindTurbine = require("../../models/windTurbine");
const House = require("../../models/house");
const User = require("../../models/user");

module.exports = {
    createTurbine: async (args, req) => {
        if(!req.isAuthenticated){
            throw new Error("Not authorized");
        }
        try {
            const fetchedUser = await User.findOne({_id: req.userId})
            const fetchedHouse = await House.findOne({owner: fetchedUser, address: args.createTurbineInput.address});
            if(!fetchedHouse){
                throw new Error ("Could not find specified house.");
            }
            
        }
        catch(e) {
            throw (e);
        }
    }
};
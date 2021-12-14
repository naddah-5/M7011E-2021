const House = require("../../models/house");
const User = require("../../models/user");

module.exports = {
    createHouse: async (args, req) => {
        console.log("Entered create house function.")
        /*if(!req.isAuthenticated){
            console.log("Not authorized.")
            throw new Error("Not authorized");
            }*/
        try{
            //const fetchedUser = await User.findOne({_id: args.houseInput.owner});
            const house = new House({
                address: args.houseInput.address,
                owner: args.houseInput.owner
            });
            const result = await house.save();
            return {...result._doc, address: result.address, owner: result.owner, _id: result._id};
        }
        catch (e) {
            console.log("Create house failed.")
            throw (e);
        }
    },
    deleteHouse: async (args, req) => {
        if(!req.isAuthenticated) {
            throw new Error ("Not authorized");
        }
        try {
            const fetchedOwner = await User.findOne({_id: req.userId});
            const house = await House.findOne({address: args.houseInput.address, owner: fetchedOwner});
            const result = await House.deleteOne({_id: house._id});
            
            //acknowledged is a property of the deleteOne return object
            //if the operation was successful it is set to true.
            if(result.acknowledged === true)
                return true;
            else {
                return false;
            }
        }
        catch(e) {
            throw (e);
        }
    }
};
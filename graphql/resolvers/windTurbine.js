const WindTurbine = require("../../models/windTurbine");
const House = require("../../models/house");
const User = require("../../models/user");
const windTurbine = require("../../models/windTurbine");

module.exports = {
    createWindTurbine: async (args, req) => {
        /*if(!req.isAuthenticated){
            throw new Error("Not authorized");
        }*/
        try {
            const fetchedUser = await User.findOne({_id: args.windTurbineInput.ownerID})
            const fetchedHouse = await House.findOne({ownerID: args.windTurbineInput.ownerID, address: args.windTurbineInput.address});
            if(!fetchedHouse || !fetchedUser){
                throw new Error ("Could not find specified house or user.");
            }
            else if (fetchedHouse.windTurbineID) {
                //retrieve and store the windturbine quantity then increment it and update the value stored in the database
                const windTurbineQuantity = await WindTurbine.findOne({ownerID: fetchedHouse.windTurbineID});
                const newQuantity = windTurbineQuantity + 1;
                const increment = await WindTurbine.updateOne({_id: fetchedHouse.windTurbineID}, {quantity: newQuantity})
                /*
                acknowledged is a boolen field in the return object from updateOne
                */
                return increment.acknowledged
            }
            else {
                const createdWindTurbine = new WindTurbine({
                    ownerID: fetchedUser._id,
                    houseID: fetchedHouse._id
                });
                const result = await createdWindTurbine.save();
                return {...result._doc, ownerID: result.ownerID, houseID: result.houseID}
            }
            
        }
        catch(e) {
            throw (e);
        }
    },
    deleteWindTurbine: async (req, args) => {
        /*if(!req.isAuthenticated){
            throw new Error ("Not authorized");
        }
        */
        try {
            const fetchedUser = await User.findOne({_id: args.windTurbineInput.ownerID})
            const fetchedHouse = await House.findOne({ownerID: args.windTurbineInput.ownerID, address: args.windTurbineInput.address})
            if(!fetchedHouse || !fetchedUser){
                throw new Error ("Could not find specified house or user,")
            }
            const fetchedWindTurbine = await WindTurbine.findOne({_id: fetchedHouse.windTurbineID})
            if (fetchedWindTurbine.quantity > 1) {
                let oldQuantity = fetchedWindTurbine.quantity;
                let newQuantity = oldQuantity - 1;
                const decrement = await WindTurbine.updateOne({_id: fetchedWindTurbine._id}, {quantity: newQuantity});
                return decrement.acknowledged;
            }
            else {
                const deleteOperation = await WindTurbine.deleteOne({_id: fetchedWindTurbine._id});
                return deleteOperation.acknowledged;
            }
        }
        catch(e) {
            throw (e);
        }
    }
};
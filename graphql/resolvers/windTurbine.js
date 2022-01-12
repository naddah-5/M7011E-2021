const WindTurbine = require("../../models/windTurbine");
const House = require("../../models/house");
const User = require("../../models/user");

module.exports = {
    createWindTurbine: async (args, req) => {
        /*if(!req.isAuthenticated){
            throw new Error("Not authorized");
        }*/
        try {
            const fetchedUser = await User.findOne({_id: req.windTurbineInput.ownerID})
            const fetchedHouse = await House.findOne({ownerID: req.windTurbineInput.ownerID, address: req.windTurbineInput.address});
            if(!fetchedHouse || !fetchedUser){
                throw new Error ("Could not find specified house or user.");
            }
            else if (fetchedHouse.windTurbineID) {
                //retrieve and store the windturbine quantity then increment it and update the value stored in the database
                let windTurbineQuantity = await WindTurbine.findOne({ownerID: fetchedHouse.windTurbineID});
                let newQuantity = windTurbineQuantity + 1;
                const increment = await WindTurbine.updateOne({_id: fetchedHouse.windTurbineID}, {quantity: newQuantity})
                /*
                acknowledged is a boolen field in the return object from updateOne
                */
                return increment.acknowledged
            }
            
        }
        catch(e) {
            throw (e);
        }
    },
    deleteWindTurbine: async (req) => {
        /*if(!req.isAuthenticated){
            throw new Error ("Not authorized");
        }
        */
        try {
            const fetchedUser = await User.findOne({_id: req.windTurbineInput.ownerID})
            const fetchedHouse = await House.findOne({ownerID: req.windTurbineInput.ownerID, address: req.windTurbineInput.address})
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
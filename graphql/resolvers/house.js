const House = require("../../models/house");
const User = require("../../models/user");
const {returnHouse} = require('./helper');

module.exports = {
    getHouse: async (args,req) => {
        if(!req.isAuth) {
            throw new Error('Not authorized!');
        }
        try {
            const house = await House.findOne({owner: args.getHouse.userId})
            return returnHouse(house);
        } catch(err) {
            throw err;
        }
    },
    createHouse: async (args) => {
        
        const house = new House({
            address: args.houseInput.address,
            owner: args.houseInput.owner
        });
        let createdHouse;
        try {
            const result = await house.save()
      
            createdHouse = returnHouse(result);
            
            const user = await User.findById(args.houseInput.owner);
      
            if(!user) {
                throw new Error('User does not exist')
            }
            user.houses = house;
            
            await user.save();
            return createdHouse;
        } catch(err) {
            throw err;
        }
    },
    updateHouseBuyRatio: async (args, req) => {
        if(!req.isAuth) {
            throw new Error ("Not authorized");
        }
        
       try {
        const house = await House.updateOne({owner: args.buyRatioInput.userId}, {buyRatio: args.buyRatioInput.buyRatio});
        let updatedHouse;
        updatedHouse = returnHouse(house);
        return updatedHouse;
       }
       catch (err) {
           console.log(err);
        throw (err);
        }
    },
    updateHouseSellRatio: async (args, req) => {
        if(!req.isAuth) {
            throw new Error ("Not authorized");
        }
        
       try {
        const house = await House.updateOne({owner: args.sellRatioInput.userId}, {sellRatio: args.sellRatioInput.sellRatio});
        let updatedHouse;
        updatedHouse = returnHouse(house);
        return updatedHouse;
       }
       catch (err) {
        throw (err);
        }
    },
    deleteHouse: async (args, req) => {
        /*if(!req.isAuthenticated) {
            throw new Error ("Not authorized");
        }
        */
        try {
            const fetchedOwner = await User.findOne({_id: req.houseInput.ownerID});
            const house = await House.findOne({address: req.houseInput.address, owner: fetchedOwner._id});
            const result = await House.deleteOne({_id: house._id});
            
            //acknowledged is a property of the deleteOne return object
            //if the operation was successful it is set to true.
            return result.acknowledged;
        }
        catch(e) {
            throw (e);
        }
    }
};
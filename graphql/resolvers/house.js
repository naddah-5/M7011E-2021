const House = require("../../models/house");
const User = require("../../models/user");
const {returnHouse} = require('./helper');

module.exports = {
    getHouse: async (args,req) => {
        //if(!req.isAuthenticated) {
            //throw new Error('Not authorized!');
        //}
        try {
            const house = await House.findOne({owner: args.houseGet.userId})
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
      
            createdProsumer = returnHouse(result);
            
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
        /*if(!req.isAuthenticated) {
            throw new Error ("Not authorized");
        }
        */
       try {
        const house = await House.updateOne({owner: args.houseBuyRatio.userId}, {buyRatio: args.houseBuyRatio.buyRatio});
        let updatedHouse;
        updatedHouse = returnHouse(house);
        return updatedHouse;
       }
       catch (err) {
        throw (err);
        }
    },
    updateHouseSellRatio: async (args, req) => {
        /*if(!req.isAuthenticated) {
            throw new Error ("Not authorized");
        }
        */
       try {
        const house = await House.updateOne({owner: args.houseSellRatio.userId}, {sellRatio: args.houseSellRatio.sellRatio});
        let updatedHouse;
        updatedHouse = returnHouse(house);
        return updatedHouse;
       }
       catch (err) {
        throw (err);
        }
    },
    updateHouseProduction: async (args, newProduction, req) => {
        /*if(!req.usAuthenticated) {
            throw new Error ("Not authorized");
        }*/
        try {
            let res = House.updateOne({_id: args.house._id}, {production: newProduction});
            return res.result.ok;
        }
        catch (e) {
            throw (e);
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
    },
    listAllHomes: async (req) => {
        /*if (!req.isAuthenticated) {
            throw new Error ("Not authorized");
        }*/
        try {
            const allHomes = await House.find().toArray();
            return allHomes;            
        }
        catch (e) {
            throw (e);
        }
    }
};
const House = require("../../models/house");

module.exports = {
    createHouse: async (args, req) => {
        if(!req.isAuthenticated){
            throw new Error("Not authorized");
        }
        const house = new House({
            address: args.houseInput.address,
            owner: args.houseInput.owner,
            windTurbineId: args.houseInput.windTurbineId,
            consumption: args.houseInput.consumption,
            minConsumption: args.houseInput.minConsumption,
            maxConsumption: args.houseInput.maxConsumption
        });
        const result = await house.save();
    }
}
const Battery = require("../../models/battery");
const House = require("../../models/house");

module.exports = {
    createBattery: async (req, args) => {
        /*if(!req.isAuthenticated){
            console.log("Not authorized");
            throw new Error("Not authorized");
        }*/
        try {
            const fetchedHouse = await House.findOne({_id: args.batteryInput.houseID});
            if (!fetchedHouse) {
                console.log("House not found.");
                return false;
            }
            else {
                const battery = new Battery({
                    houseID: fetchedHouse._id                   
                });
                const result = await battery.save();
                return {...result._doc, houseID: result.houseID, capacity: result.capacity, maxCapacity: result.maxCapacity};
            }
        }
        catch (e) {
            console.log("Create battery failed.");
            throw (e);
        }
    },
    deleteBattery: async (req, args) => {
        /*if (!req.isAuthenticated){
            console.log("Not authorized.")
            throw new Error("Not authorized.");
        }*/
        try{
            const fetchedHouse = await House.findOne({_id: args.batteryInput.houseID});
            const removeBattery = await Battery.deleteOne({_id: fetchedHouse.batteryID});
            const removeBatteryFromHouse = await House.updateOne({_id: fetchedHouse._id}, { $unset: {battery: ""}})
            const saveHouse = await House.save();

            if (removeBattery && removeBatteryFromHouse && saveHouse) {
                return true;
            }
        }
        catch (e) {
            console.log("Delete operation failed.");
            throw (e);
        }
    }
}
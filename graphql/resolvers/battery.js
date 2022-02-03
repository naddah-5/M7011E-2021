const Battery = require("../../models/battery");
const House = require("../../models/house");

module.exports = {
    createBattery: async (args, req) => {
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
    deleteBattery: async (args, req) => {
        /*if (!req.isAuthenticated){
            console.log("Not authorized.")
            throw new Error("Not authorized.");
        }*/
        try {
            const fetchedHouse = await House.findOne({_id: args.batteryInput.houseID});
            const removeBatteryFromHouse = await House.updateOne({_id: fetchedHouse._id}, {battery: ""})
            const removeBattery = await Battery.deleteOne({_id: fetchedHouse.batteryID});
            const saveHouse = await House.save();

            if (removeBattery && removeBatteryFromHouse && saveHouse) {
                return true;
            }
        }
        catch (e) {
            console.log("Delete operation failed.");
            throw (e);
        }
    },
    updateBatteryCapacity: async (args, req) => {
        /*if(!req.isAuthenticated){
            throw new Error ("Not authorized");
        }*/
        try {
            let fetchedBattery = await Battery.findOne({house: args.batteryInput.house});
            let currentCapacity = args.fetchedBattery.capacity;
            let newCapacity = fetchedBattery.capacity + currentCapacity;
            if(newCapacity <= 0) {
                const updateBatteryOperation = await Battery.findOneAndUpdate({house: args.batteryInput.house}, {capacity: 0}, {new: true});    
            }
            else if(newCapacity >= fetchedBattery.maxCapacity) {
                const updateBatteryOperation = await Battery.findOneAndUpdate({house: args.batteryInput.house}, {capacity: fetchedBattery.maxCapacity}, {new: true});
            }
            //overly verbose but extra safeguard against unknown errors
            else if(0 < newCapacity < fetchedBattery.maxCapacity) {
            const updateBatteryOperation = await Battery.findOneAndUpdate({house: args.batteryInput.house}, {capacity: newCapacity}, {new: true});
            }
            if(!updateBatteryOperation) {
                throw new Error ("Failed to update battery capacity, battery not found");
            }
            return updateBatteryOperation;
        }
        catch (e) {
            throw (e);
        }
    }
}
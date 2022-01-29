const Region = require("../../models/region");

module.exports = {
    createRegion: async (req) => {
        /*if(!req.isAuthenticated){
            throw new Error ("Not authorized");
        }*/
        try {
            const existingRegion = await Region.findOne()
            if(existingRegion) {
             throw new Error('There alredy exists a region')
        }
            const newRegion = new Region({});
            const result = await newRegion.save();
      
            return {...result._doc, name: null, _id: result.id};
        }
        catch (e) {
            throw (e);
        }
    },
    deleteAllRegions: async (req, args) => {
        /*if(!req.isAuthenticated){
            throw new Error ("Not authorized");
        }*/
        try {
            const result = await Region.remove({});
            if(result({"nRemoved": 0})){
                return false;
            }
            return true;
        }
        catch (e) {
            throw (e);
        }
    },
    regionInfo: async (req) => {
        /*if(!req.isAuthenticated) {
            throw new Error ("Not authorized");
        }*/
        try {
            /*since only one region is currently supported we just need to return the first one, 
            there should NEVER be more than one region in the collection.
            */
            const fetchedRegion = await Region.findOne({});
            return fetchedRegion;
        }
        catch (e) {
            throw (e);
        }
    },
    updateGridCapacity: async (args, req) => {
        /*if(!req.isAuthenticated) {
            throw new Error ("Not authorized");
        }*/
        try {
            /**
             * Throws an error if grid capacity failed to update, if the desired new grid capacity is below zero or above the max capacity
             * the function returns false. If the new desired capacity is within current max capacity the function returns true.
             */
            let capacityChange = args.regionGridCapacity.gridCapacity;
            let fetchedRegion = await Region.findOne({_id: args.regionGridCapacity.regionID});

            if(!fetcchedRegion) {
                throw new Error ("Specified region not found");
            }

            let newGridCapacity = fetchedRegion.gridCapacity + capacityChange;

            if(newGridCapacity < 0) {
                const emptyGrid = await Region.findOneAndUpdate({_id: fetchedRegion._id}, {gridCapacity: 0}, {new: true});
             
                if(!emptyGrid) {
                    throw new Error ("Failed to update grid capacity");
                }
                return false;
            }
            else if(newGridCapacity > fetchedRegion.maxGridCapacity) {
                const fullGrid = await Region.findOneAndUpdate({_id: fetchedRegion._id}, {gridCapacity: fetchedRegion.maxGridCapacity}, {new: true});

                if(!fullGrid) {
                    throw new Error ("Failed to update grid capacity");
                }

                return false;
            }
            else {
                const validGrid = await Region.findOneAndUpdate({_id: fetchedRegion._id}, {gridCapacity: newGridCapacity}, {new: true});
            
                if(!validGrid) {
                    throw new Error ("Failed to update grid capacity");
                }

                return true;
            }
            
        }
        catch (e) {
            throw (e);
        }
    },
    incrementRegion: async (args, req) => {
        /*if(!req.isAuthenticated) {
            throw new Error ("Not authorized");
        }*/
        try {
            const regionUpdate = await Region.findOneAndUpdate({name: args.incrementRegionInput.name}, {windSpeed: args.incrementRegionInput.windSpeed, gridCapacity: args.incrementRegionInput.gridCapacity, gridDemand: args.gridDemand}, {new: true});
            const result = await regionUpdate.save();
      
            return result;

        }
        catch (e) {
            throw (e);
        }
    }
}
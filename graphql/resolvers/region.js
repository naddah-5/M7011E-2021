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
    updateRegion: async (req, args) => {
        /*if(!req.isAuthenticated) {
            throw new Error ("Not authorized");
        }*/
        try {
            const fetchedRegion = await Region.findOne({name: args.name});
            
        }
        catch (e) {
            throw (e);
        }
    }
}
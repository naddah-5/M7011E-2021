import { listAllHomes } from "../../graphql/resolvers"
import "./consumptionIncrementor"
const House = require("../../models/house");
const WindTurbine = require("../../models/windTurbine");

//this should provide general functionality to itterate a houses data in the simulation
//for instance a function that takes a houses data as input, retrieves the region data and returns the itterated house data

//the arguments should probably be compiled into a json object
async function houseItterator(regionData){
    let houseList = listAllHomes();
    while(houseList.length() > 0) {
        let currentHouse = houseList.pop();
        if(currentHouse.windTurbineID) {
            let turbine = await WindTurbine.findOne({_id: currentHouse.windTurbineID});
            let electricProduction = turbine.efficency * regionData.windSpeed;
            
        }
    }
}
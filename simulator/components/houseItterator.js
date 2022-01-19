import { listAllHomes } from "../../graphql/resolvers"
import "./consumptionIncrementor"
const House = require("../../models/house");
const WindTurbine = require("../../models/windTurbine");
const Region = require("../../models/region");
const Simulator = require("../global_simulator");

//this should provide general functionality to itterate a houses data in the simulation
//for instance a function that takes a houses data as input, retrieves the region data and returns the itterated house data

//the arguments should probably be compiled into a json object
async function houseItterator(regionData){
    let houseList = listAllHomes();
    let windVariation = 5;
    while(houseList.length() > 0) {
        let currentHouse = houseList.pop();
        /**
         * if the house is has a wind turbine we retrieve and store it in "turbine", then we do some stuff with it.
         */
        if(currentHouse.windTurbineID) {
            let turbine = await WindTurbine.findOne({_id: currentHouse.windTurbineID});
            let regionalWindSpeed = regionData.region.windSpeed;
            /**
             * get a local value for the wind speed, by default the regional value is 5 m/s and the wind variation is 5 m/s as well
             * i.e. a wind speed between 0 m/s and 10 m/s
             */
            let localWindSpeed = Simulator.getWind(regionalWindSpeed-windVariation, regionalWindSpeed+windVariation);
            let electricProduction = turbine.efficency * localWindSpeed;
            /**
             * randomize new electricity consumption between chosen values
             */
            let newElectricConsumption = Simulator.getElectricityConsumption(0, 100);
            /**
             * 
             */
            let netProduction = electricProduction - newElectricConsumption;
            if(netProduction > 0) {
                let gridSale = netProduction * Simulator.sellRatio;
                let batteryBuffer = netProduction - gridSale;
                let incrementHouse = {};
                incrementHouse["consumption"] = newElectricConsumption;
                incrementHouse["production"] = electricProduction;
                incrementHouse["netProduction"] = netProduction;
                let batteryInput = {};
                batteryInput["house"] = currentHouse._id;
                batteryInput["capacity"] = batteryBuffer;
            }
        }
    }
}
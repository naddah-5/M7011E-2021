const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type WindTurbine {
  _id: ID!
  house: House!
  efficiency: Float
}

type Battery {
  _id: ID!
  house: House!
  capacity: Float
}

type SimulatorEvent {
  _id: ID!
  windSpeed: Float!
  electricityDemand: Float!
  price: Float!
  date: String!
}

type User {
  _id: ID!
  email: String!
  password: String
  firstName: String
  lastName: String
  birthDate: String
  address: String
  picture: String
  houses: House!
}

type House {
  _id: ID!
  address: String!
  owner: User!
  windTurbineID: WindTurbine
  batteryID: Battery
  consumption: Float
  minConsumption: Float
  maxConsumption: Float
  sellRatio: Float
  buyRatio: Float
  production: Float
  netProduction: Float
  status: Float
  region: String
}

type Region {
  _id: ID!
  name: String
  temperature: Float
  windSpeed: Float
  gridCapacity: Float
  maxGridCapacity: Float
  gridDemand: Float
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input UserInput {
  email: String!
  password: String!
  firstName: String
  lastName: String
  birthDate: String
  address: String
}

input HouseInput {
  address: String!
  owner: ID!
  consumption: Float
  minConsumption: Float
  maxConsumption: Float
  sellRatio: Float
  buyRatio: Float
  production: Float
  netProduction: Float
  blockTime: Float
  region: String
}

input WindTurbineInput {
  house: ID!
  efficiency: Float
}

input BatteryInput {
  house: ID!
  capacity: Float
}

input GetHouse {
  userId: ID!
}

input GetUser {
  userId: ID!
}

input SimulatorEventInput {
  windSpeed: Float!
  electricityDemand: Float!
  price: Float!
  date: String!
}

input SellRatioInput {
  userId: ID!
  sellRatio: Float!
}

input RegionInput {
  name: String
  temperature: Float
  windSpeed: Float
  gridCapacity: Float
  maxGridCapacity: Float
  gridDemand: Float
}

input IncrementRegionInput {
  name: String!
  windSpeed: Float!
  gridCapacity: Float!
  gridDemand: Float!
}

input HouseGet {
  userId: ID!
  sellRatio: Float!
}

input BuyRatioInput {
  userId: ID!
  buyRatio: Float!
}

input IncrementHouse {
  id: String
  consumption: Float
  production: Float
  netProduction: Float
}


input RegionGridDemand {
  regionID: String
  gridDemand: Float
}

input RegionGridCapacity {
  regionID: String
  gridCapacity: Float
}

type RootQuery {
  simEvents: SimulatorEvent!
  getHouse(getHouse: GetHouse): House!
  login(email: String!, password: String!): AuthData!
  getUser(getUser: GetUser): User!
  listAllHomes: [House]
  regionInfo: Region
  
}

type RootMutation {
  createSimEvent(simulatorEventInput: SimulatorEventInput): SimulatorEvent
  createUser(userInput: UserInput): User
  createHouse(houseInput: HouseInput): House
  deleteHouse(houseInput: HouseInput): Boolean!
  updateHouseBuyRatio(buyRatioInput: BuyRatioInput): House
  updateHouseSellRatio(sellRatioInput: SellRatioInput): House
  deleteHouse(houseInput: HouseInput): Boolean
  incrementHouse(incrementHouse: IncrementHouse): House
  createWindTurbine(windTurbineInput: WindTurbineInput): WindTurbine
  deleteWindTurbine(windTurbineInput: WindTurbineInput): Boolean
  createBattery(batteryInput: BatteryInput): Battery
  deleteBattery(batteryInput: BatteryInput): Boolean
  updateBatteryCapacity(batteryInput: BatteryInput): Battery
  createRegion: Region
  deleteAllRegions: Boolean
  updateGridCapacity(regionGridCapacity: RegionGridCapacity): Boolean!
  incrementRegion(incrementRegionInput: IncrementRegionInput): Region
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`)
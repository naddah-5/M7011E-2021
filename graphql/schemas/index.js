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
}

input WindTurbineInput {
  house: ID!
  efficiency: Float
}

input BatteryInput {
  house: ID!
  capacity: Float
}

input SimulatorEventInput {
  windSpeed: Float!
  electricityDemand: Float!
  price: Float!
  date: String!
}


input HouseGet {
  userId: ID!
}

input HouseBuyRatio {
  userId: ID!
  buyRatio: Float!
}

input HouseSellRatio {
  userId: ID!
  sellRatio: Float!
}



type RootQuery {
  simEvents: SimulatorEvent!
  getHouse(houseGet: HouseGet): House!
  login(email: String!, password: String!): AuthData!
  
}

type RootMutation {
  createSimEvent(simulatorEventInput: SimulatorEventInput): SimulatorEvent
  createUser(userInput: UserInput): User
  createHouse(houseInput: HouseInput): House
  deleteHouse(houseInput: HouseInput): Boolean
  updateHouseBuyRatio(houseBuyRatio: HouseBuyRatio): House
  updateHouseSellRatio(houseSellRatio: HouseSellRatio): House
  createWindTurbine(windTurbineInput: WindTurbineInput): WindTurbine
  deleteWindTurbine(windTurbineInput: WindTurbineInput): Boolean
  createBattery(batteryInput: BatteryInput): Battery
  deleteBattery(batteryInput: BatteryInput): Boolean
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`)
const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Prosumer {
  _id: ID!
  production: Float!
  netProduction: Float!
  buffer: Float!
  user: User!
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
  prosumers: Prosumer!
}

type House {
  _id: ID!
  address: String!
  ownerID: String!
  windTurbineID: String
  batteryID: String
  consumption: Float
  minConsumption: Float
  maxConsumption: Float
  sellRatio: Float
  buyRatio: Float
}


type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input HouseInput {
  address: String!
  ownerID: String!
}

input UserInput {
  email: String!
  password: String!
  firstName: String
  lastName: String
  birthDate: String
  address: String
}

input SimulatorEventInput {
  windSpeed: Float!
  electricityDemand: Float!
  price: Float!
  date: String!
}


input ProsumerInput {
  production: Float!
  netProduction: Float!
  buffer: Float!
  user: ID!
}

input ProsumerGet {
  userId: ID!
}


type RootQuery {
  simEvents: SimulatorEvent!
  prosumerEvents(prosumerGet: ProsumerGet): Prosumer!
  login(email: String!, password: String!): AuthData!
  
}

type RootMutation {
  createSimEvent(simulatorEventInput: SimulatorEventInput): SimulatorEvent
  createUser(userInput: UserInput): User
  createProsumer(prosumerInput: ProsumerInput): Prosumer
  deleteProsumerSimEvent(prosumerId: ID!): SimulatorEvent!
  createHouse(houseInput: HouseInput): House
  deleteHouse(houseInput: HouseInput): Boolean!
  updateHouse(buyRatio: Float!, sellRatio: Float!): House
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`)
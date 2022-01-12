const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type House {
  _id: ID!
  address: String!
  ownerID: String!
  windTurbineID: String
  batteryID: String
  consumption: Float
  minConsumption: Float
  maxConsumption: Float
}

type WindTurbine {
  _id: ID!
  ownerID: String!
  houseID: String!
  efficiency: Float
  quantity: Float
}

type Battery {
  _id: ID!
  houseID: String!
  capacity: Float
  maxCapacity: Float
}

type Prosumer {
  _id: ID!
  simulatorEvent: SimulatorEvent!
  user: String!
  production: Float
  netProduction: Float
}

type SimulatorEvent {
  _id: ID!
  windSpeed: Float!
  electricityConsumption: Float!
  price: Float!
  date: String!
}

type User {
  _id: ID!
  email: String!
  password: String!
  firstName: String!
  lastName: String!
  birthDate: String!
  address: String
  createdEvents: [SimulatorEvent!]
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
  ownerID: String!
}

input WindTurbineInput {
  ownerID: String!
  houseID: String!
  efficiency: Float
}

input BatteryInput {
  houseID: String!
}

input SimulatorEventInput {
  windSpeed: Float!
  electricityDemand: Float!
  price: Float!
  date: String!
}


input ProsumerInput {
  eventId: ID!
  production: Float
  netProduction: Float
}


type RootQuery {
  simEvents: [SimulatorEvent!]!
  prosumerSimEvents: [Prosumer!]!
  login(email: String!, password: String!): AuthData!
  
}

type RootMutation {
  createSimEvent(simulatorEventInput: SimulatorEventInput): SimulatorEvent
  createUser(userInput: UserInput): User
  createProsumer(prosumerInput: ProsumerInput): Prosumer!
  deleteProsumerSimEvent(prosumerId: ID!): SimulatorEvent!
  createHouse(houseInput: HouseInput): House
  deleteHouse(houseInput: HouseInput): Boolean!
  createWindTurbine(windTurbineInput: WindTurbineInput): WindTurbine
  deleteWindTurbine(windTurbineInput: WindTurbineInput): Boolean!
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`)
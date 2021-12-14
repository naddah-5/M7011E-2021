const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type House {
  _id: ID!
  address: String!
  owner: String!
}

type WindTurbine {
  _id: ID!
  owner: User!
  house: House!
  efficiency: Float
}

type Battery {
  _id: ID!
  house: House!
  capacity: Float
}

type Prosumer {
  _id: ID!
  simulatorEvent: SimulatorEvent!
  user: User!
  production: Float!
  netProduction: Float!
  buffer: Float!
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
  password: String
  firstName: String
  lastName: String
  birthDate: String
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
  owner: String!
}

input WindTurbineInput {
  owner: ID!
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


input ProsumerInput {
  eventId: ID!
  production: Float!
  netProduction: Float!
  buffer: Float!
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
}

schema {
  query: RootQuery
  mutation: RootMutation
}
`)
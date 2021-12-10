const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type House {
  _id: ID!
  address: String!
  owner: User!
  windTurbine: WindTurbine
  consumption: Float
  minConsumption: Float
  maxConsumption: Float
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
  owner: ID!
  windTurbine: ID!
  consumption: Float
  minConsumption: Float
  maxConsumption: Float
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

}

schema {
  query: RootQuery
  mutation: RootMutation
}
`)
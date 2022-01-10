const { buildSchema } = require('graphql');

module.exports = buildSchema(`

type Prosumer {
  _id: ID!
  production: Float!
  netProduction: Float!
  buffer: Float!
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
}


type RootQuery {
  simEvents: SimulatorEvent!
  prosumerEvents: Prosumer!
  login(email: String!, password: String!): AuthData!
  
}

type RootMutation {
  createSimEvent(simulatorEventInput: SimulatorEventInput): SimulatorEvent
  createUser(userInput: UserInput): User
  createProsumer(prosumerInput: ProsumerInput): Prosumer
  deleteProsumerSimEvent(prosumerId: ID!): SimulatorEvent!

}

schema {
  query: RootQuery
  mutation: RootMutation
}
`)
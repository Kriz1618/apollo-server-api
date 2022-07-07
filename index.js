const { MockList } = require("@graphql-tools/mock");
const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  scalar Date

  """
  An object that describes the characteristics of a ski day
  """
  type SkiDay {
    "A ski day's unique identification"
    id: ID!
    "A ski day's date"
    date: Date!
    "A ski day's mountain"
    mountain: String!
    "A ski day's condition base on an enum"
    condition: Conditions
  }

  enum Conditions {
    POWDER
    HEAVY
    ICE
    THIN
  }

  type Query {
    totalDays: Int!
    allDays: [SkiDay!]!
  }

  input AddDayInput {
    date: Date!
    mountain: String!
    conditions: Conditions
  }

  type RemoveDayPayload {
    day: SkiDay!
    removed: Boolean
    totalBefore: Int
    totalAfter: Int!
  }

  type Mutation {
    addDay(input: AddDayInput!): SkiDay
    removeDay(id: ID!): RemoveDayPayload!
  }

  type  {
    newDay: SkiDay!
  }
`;

const resolvers = {};

const mocks = {
    Date: () => "06/07/2022",
    String: () => {
        const idx = Math.floor(Math.random() * (2 - 0 + 1) + 0);
        return ["Some string value", "Cool data", "Last string  mock"][idx];
    },
    Query: () => ({
        allDays: () => new MockList([2, 5])
    })
}

const server = new ApolloServer({
  typeDefs,
  mocks,
});

server.listen().then(({ url }) => console.log(`Server running at ${url}`));

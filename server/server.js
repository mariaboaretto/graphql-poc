import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schemas/schema.js"
import { resolvers } from "./resolvers/resolvers.js"

// Server setup
const server = new ApolloServer({
    typeDefs,
    resolvers
})

server.listen().then(({ url }) => {
    console.log(`Server running on ${url}`)
})
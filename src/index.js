const { ApolloServer } = require("apollo-server");
const resolvers = require("./resolvers");
const typeDefs = require("./types");
const Database = require("./database/definition");
const GistsAPI = require("./datasources/gistsApi");
const GistsDB = require("./datasources/gistsDb");

// Initialize connection to local postgresql database
const db = new Database();

// Define the apollo graphql server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    gistsApi: new GistsAPI(),
    gistsDb: new GistsDB(db),
  }),
});

// Start server
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

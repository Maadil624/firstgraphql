const express = require('express');
const cors = require('cors')
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./graphqlschema/type-defs');
const { resolvers } = require('./graphqlschema/resolvers');
const { loginController, verifyUser, rejisterController } = require('./controller/loginController')
const connectDB = require('./database/database');
const PORT = process.env.PORT || 4000;

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
app.use(cors());
app.use(express.json());
// database connect
connectDB();

// routes
// app.post('/login', loginController)
// app.post('/register', rejisterController)

async function startServer() {
    await server.start();
    server.applyMiddleware({ app, path: '/graphql' });
}
startServer();

app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}/graphql`);
});


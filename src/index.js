import { ApolloServer } from 'apollo-server';
import { typeDefs } from './typeDefs'
import { resolvers } from './resolvers'
import { Movie as MovieModel } from './model/movie';

import mongoose from 'mongoose';
import Movies from './dataSource/movies';

const dataSources = () => ({
    movies: new Movies(MovieModel),
  });

const dburi = ""

const main = async () => {
    await mongoose.connect(dburi, { useNewUrlParser: true, useUnifiedTopology: true })
  };
  
  main()
    .then(console.log('🎉 connected to database successfully'))
    .catch(error => console.error(error));

const server = new ApolloServer({typeDefs, resolvers,dataSources})



server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
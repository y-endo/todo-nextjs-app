import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:3000/api/graphql'
  }),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache'
    }
  }
});

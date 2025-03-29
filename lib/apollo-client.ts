import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Cookies from 'js-cookie';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql/',
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get('csrftoken');
  return {
    headers: {
      ...headers,
      'X-CSRFToken': token ? token : '',
    }
  }
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([authLink, httpLink]), 
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
    },
  },
}); 
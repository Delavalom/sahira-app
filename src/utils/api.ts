import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  gql,
} from "@apollo/client";
import Env from '../../config'
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "https://graphql.contentful.com/content/v1/spaces/ksc9hpf02ja4/environments/master",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer ${Env.apiToken}`,
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export const querys = {
  GET_IMAGES: gql`
    query pageViewCollectionQuery {
      pageViewCollection {
        items {
          backgroundImage {
            url
          }
          isMainView
        }
      }
    }
  `,
};

export type QuerySchemas = {
  GET_IMAGES: {
    pageViewCollection: {
      items: {
        backgroundImage: {
          url: string;
        };
        isMainView: boolean;
      }[];
    };
  };
};

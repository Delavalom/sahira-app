import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://graphql.contentful.com/content/v1/spaces/ksc9hpf02ja4/environments/master",
  cache: new InMemoryCache(),
  headers: {
    Autorization: `Bearer${"CFPAT-rWenGHbztHiFt4YZ_YN14Oy4jbyaQp9ErVTReomp75g"}`,
  },
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

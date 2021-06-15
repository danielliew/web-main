import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gqlDevelopmentUrl, gqlProductionUrl } from "./api.routes";

export default new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? gqlProductionUrl
      : gqlDevelopmentUrl,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
    },
    query: {
      fetchPolicy: "no-cache",
    },
    mutate: {
      fetchPolicy: "no-cache",
    },
  },
});

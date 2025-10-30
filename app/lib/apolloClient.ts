import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

function getGraphQLUrl(): string {
  if (typeof window !== "undefined") {
    // Client-side: use relative URL
    return "/api/graphql";
  }

  if(process.env.NODE_ENV === "production") {
    return "https://apollo-client-nextjs-sandbox.vercel.app/api/graphql";
  }

  return "http://localhost:3100/api/graphql";
}

export const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: new HttpLink({
    uri: getGraphQLUrl(),
    credentials: "same-origin",
  }),
  cache: new InMemoryCache(),
});

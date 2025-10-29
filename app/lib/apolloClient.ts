import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

function getGraphQLUrl(): string {
  if (typeof window !== "undefined") {
    // Client-side: use relative URL
    return "/api/graphql";
  }

  // Server-side: use absolute URL with localhost
  const host = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3100";
  return `${host}/api/graphql`;
}

export const client = new ApolloClient({
  ssrMode: typeof window === "undefined",
  link: new HttpLink({
    uri: getGraphQLUrl(),
    credentials: "same-origin",
  }),
  cache: new InMemoryCache(),
});

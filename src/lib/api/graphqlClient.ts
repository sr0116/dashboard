import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
    "http://127.0.0.1:8000/app_graphql",
    {
        headers: {
            "Content-Type": "application/json",
        },
    }
);

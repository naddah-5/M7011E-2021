import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";


const API_URL = `http://localhost:4000/graphql`;

const graphQLClient = new GraphQLClient(API_URL, {
    headers: {
        "Content-Type": "application/json"
      }
  });


export function getSimData() {
    return useQuery("simEvents", async () => {
        const { getSimDataList } = await graphQLClient.request(gql`
            query {
                simEvents {
                    windSpeed
                    electricityDemand
                    price
                }
            }
        `);
        return getSimDataList;
    });
}


export function loginUser(email, password) {
    return useQuery("login-user", async () => {
        const { userData } = await graphQLClient.request(gql`
            query login($email: String!, $password: String) {
                login(email: $email, password: $password) {
                    token
                    userId
                    tokenExpiration
                }
            }
        `,
        {email, password}
        );
        return userData;
    });
}

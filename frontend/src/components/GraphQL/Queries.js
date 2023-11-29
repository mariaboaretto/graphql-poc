import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query Users {
        users {
        id,
        f_name,
        l_name,
        email,
        username
        }
    }
`
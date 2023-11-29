import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
    mutation CreateUser($user: CreateUserInput!) {
  createUser(user: $user)
}`
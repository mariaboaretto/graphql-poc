import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
    mutation CreateUser($user: CreateUserInput!) {
  createUser(user: $user)
}`

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($post: CreatePostInput!) {
    createPost(post: $post)
  }
`
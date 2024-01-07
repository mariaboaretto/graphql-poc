import { gql } from "@apollo/client";

export const CREATE_USER_MUTATION = gql`
    mutation CreateUser($user: CreateUserInput!) {
  createUser(user: $user)
}`

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($deleteUserId: ID!) {
  deleteUser(id: $deleteUserId)
  }
`

export const CREATE_POST_MUTATION = gql`
  mutation CreatePost($post: CreatePostInput!) {
    createPost(post: $post)
  }
`

// Edits user info (first and last names)
export const EDIT_USER_MUTATION = gql`
  mutation EditUserInfo($editUserInfoId: ID!, $user: EditUserInfoInput!) {
    editUserInfo(id: $editUserInfoId, user: $user)
  }
`

// Edits user password
export const EDIT_USER_PASSWORD_MUTATION = gql`
  mutation Mutation($editUserPasswordId: ID!, $user: EditUserPasswordInput!) {
    editUserPassword(id: $editUserPasswordId, user: $user)
  }  
`

// Edits a post
export const EDIT_POST_MUTATION = gql`
  mutation EditPost($editPostId: ID!, $edits: EditPostInput!) {
    editPost(id: $editPostId, edits: $edits)
  }
`

// Deletes a post from DB
export const DELETE_POST_MUTATION = gql`
  mutation DeletePost($deletePostId: ID!) {
      deletePost(id: $deletePostId)
    }  
`

// Creates a new comment
export const ADD_COMMENT_MUTATION = gql`
  mutation AddComment($comment: CommentInput!) {
    addComment(comment: $comment)
  } 
`

// Deletes a comment
export const DELETE_COMMENT_MUTATION = gql`
  mutation DeleteComment($deleteCommentId: ID!) {
    deleteComment(id: $deleteCommentId)
  }
`

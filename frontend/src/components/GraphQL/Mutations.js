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

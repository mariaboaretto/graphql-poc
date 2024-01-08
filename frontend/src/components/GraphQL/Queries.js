import { gql, makeReference } from "@apollo/client";

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

export const GET_USER = gql`
    query User($userId: ID!) {
        user(id: $userId) {
            id,
            f_name,
            l_name,
            username,
            email
        }
    }
`

export const GET_USERNAMES = gql`
    query Users {
        users {
            id,
            username
        }
    }
`

// Gets all posts in DB (title, content, author and post date)
export const GET_POSTS = gql`
query Posts {
  posts {
    id,
    title,
    content,
    author {
        f_name,
        l_name
        },
    postedOn
        }
    } 
`
// Gets specific post
export const GET_POST = gql`
    query Post($postId: ID!) {
    post(id: $postId) {
        id,
        title,
        content,
        author {
        id,
        f_name,
        l_name
        },
        postedOn,
        comments {
        commentId
        }    
    }
    }
`

// Gets post details for editing post page (title, author and content only)
export const GET_POST_FOR_EDITING = gql`
    query Post($postId: ID!) {
        post(id: $postId) {
            id,
            title,
            content,
            author {
                f_name,
                l_name
                }
            }
        }
`

// Gets all comments of a specific post
export const GET_COMMENTS_BY_POST = gql`
    query Post($postId: ID!) {
    post(id: $postId) {
        comments {
        author {
            id,
            username
        },
        commentId,
        content,
        postedOn
            } 
        }
    }
`
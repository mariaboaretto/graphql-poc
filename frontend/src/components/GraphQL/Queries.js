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

export const GET_USER = gql`
    query User($userId: ID!) {
        user(id: $userId) {
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
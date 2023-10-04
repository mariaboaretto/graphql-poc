// Definitions of data types

export const typeDefs = `#graphql
    # Entities
    type User {
        id: ID!,
        username: String!,
        comments: [Comment!],
        posts: [Post!]
    }

    type Post {
        id: ID!,
        title: String!,
        content: String!,
        author: User!,
        comments: [Comment!]
    }

    type Comment {
        id: ID!,
        comment: String!,
        post: Post!,
        author: User!
    }

    # Endpoints
    type Query {
        users: [User!],
        user(id: ID!): User,
        posts: [Post!],
        post(id: ID!): Post,
        comments: [Comment!],
        comment(id: ID!): Comment
    }

    # Mutations
    type Mutation {
        deleteUser(id: ID!): String,
        createUser(user: CreateUserInput!): User,
        addComment(comment: CommentInput!): Comment,
        editPost(id: ID!, edits: EditPostInput): Post
    }

    # Inputs
    input CreateUserInput {
        username: String!
    },
    input CommentInput {
        comment: String!,
        post_id: ID!,
        author_id: ID!        
    },
    input EditPostInput {
        title: String,
        content: String,
    }
`
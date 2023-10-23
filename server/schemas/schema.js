// Definitions of data types

export const typeDefs = `#graphql
    # Entities
    type User {
        id: ID!,
        f_name: String!,
        l_name: String!,
        username: String!,
        email: String!,
        password: String!,
        comments: [Comment!],
        posts: [Post!]
    }

    type Post {
        id: ID!,
        title: String!,
        content: String!,
        author: User!,
        publishDate: String!,
        comments: [Comment!]
    }

    type Comment {
        id: ID!,
        comment: String!,
        post: Post!,
        author: User!,
        publishDate: String!
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
        createUser(user: CreateUserInput!): String,
        addComment(comment: CommentInput!): Comment,
        editPost(id: ID!, edits: EditPostInput): Post
    }

    # Inputs
    input CreateUserInput {
        firstName: String!,
        lastName: String!,
        username: String!,
        email: String!
        password: String!
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
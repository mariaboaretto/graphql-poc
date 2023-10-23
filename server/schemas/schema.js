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
        postedOn: String!,
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
        # User Mutations
        deleteUser(id: ID!): String,
        createUser(user: CreateUserInput!): String,
        editUserInfo(id: ID!, edits: EditUserInfoInput!): String,
        editUserPassword(id: ID!, edits: EditUserPasswordInput!): String,
        # Comment Mutations
        addComment(comment: CommentInput!): Comment,
        # Post Mutations
        createPost(post: CreatePostInput!): String,
        editPost(id: ID!, edits: EditPostInput!): String,
        deletePost(id: ID!): String
    }

    # User Inputs
    input CreateUserInput {
        firstName: String!,
        lastName: String!,
        username: String!,
        email: String!
        password: String!
    },
    input EditUserInfoInput {
        firstName: String!,
        lastName: String!
    },
    input EditUserPasswordInput {
        currentPwrd: String!,
        newPwrd: String!,
        newPwrdConfirmation: String!
    }
    # Comment Inputs
    input CommentInput {
        comment: String!,
        post_id: ID!,
        author_id: ID!        
    },
    # Post Inputs
    input CreatePostInput {
        title: String!,
        content: String!,
        authorID: ID!,
        postedOn: String!
    },
    input EditPostInput {
        title: String,
        content: String,
    }
`
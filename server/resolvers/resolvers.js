// Data
import data from "../data.js"

let highestUserId = 5
let highestCommentId = 4
let highestPostId = 3

export const resolvers = {
    Query: {
        // Get all users
        users() {
            return data.users
        },
        // Get all posts
        posts() {
            return data.posts
        },
        // Get all comments
        comments() {
            return data.comments
        },
        // Get user by id
        user(_, args) {
            return data.users.find((user) => user.id == args.id)
        },
        // Get post by id
        post(_, args) {
            return data.posts.find((post) => post.id == args.id)
        },
        // Get comment by id
        comment(_, args) {
            return data.comments.find((comment) => comment.id == args.id)
        }
    },
    Comment: {
        // Get post associated with comment
        post(parent) {
            return data.posts.find((post) => post.id == parent.post_id)
        },
        // Get comment's author
        author(parent) {
            return data.users.find((user) => user.id == parent.author_id)
        }
    },
    Post: {
        // Get post's author
        author(parent) {
            return data.users.find((user) => user.id == parent.author_id)
        },
        // Get post's comments
        comments(parent) {
            return data.comments.filter((comment) => comment.post_id == parent.id)

        }
    },
    User: {
        // Get posts made by user
        posts(parent) {
            return data.posts.filter((post) => post.author_id == parent.id)
        },
        // Get comments made by user
        comments(parent) {
            return data.comments.filter((comment) => comment.author_id == parent.id)
        }
    },
    // Mutations
    Mutation: {
        // Delete user by id
        deleteUser(_, args) {
            data.users = data.users.filter((user) => user.id != args.id)
            return "User deleted successfully"
        },
        // Create user
        createUser(_, args) {
            highestUserId++

            let user = {
                ...args.user,
                id: highestUserId
            }

            data.users.push(user)

            return user
        },
        // Add new comment
        addComment(_, args) {
            highestCommentId++

            let comment = {
                ...args.comment,
                id: highestCommentId
            }

            data.comments.push(comment)

            return comment
        },
        // Edit a Post
        editPost(_, args) {
            let idx = data.posts.findIndex(post => post.id == args.id)

            data.posts[idx] = {
                ...data.posts[idx],
                ...args.edits
            }

            return data.posts[idx]
        }
    }
}
// Imports
import UserService from "../../services/user-service/user-service.js"
import PostService from "../../services/post-service/post-service.js"
import CommentService from "../../services/comment-service/comment-service.js"

let highestCommentId = 4

const userService = new UserService()
const postService = new PostService()
const commentService = new CommentService()

userService.init()
postService.init()
commentService.init()

export const resolvers = {
    Query: {
        // Get all users
        async users() {
            return await userService.getUsers()
        },
        // Get all posts
        async posts() {
            return await postService.getPosts()
        },
        // Get all comments
        async comments() {
            return commentService.getComments()
        },
        // Get user by id
        async user(_, args) {
            return await userService.getUserById(args.id)
        },
        // Get post by id
        async post(_, args) {
            return await postService.getPostById(args.id)
        },
        // Get comment by id
        async comment(_, args) {
            return await commentService.getCommentById(args.id)
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
        async deleteUser(_, args) {
            return await userService.removeUser(args.id)
        },

        // Create user
        async createUser(_, args) {
            let user = {
                ...args.user
            }

            return await userService.createUser(user.firstName, user.lastName, user.email, user.username, user.password)
        },

        // Edit user's info (first and last names)
        async editUserInfo(_, args) {
            return await userService.editUserInfo(args.id, args.edits.firstName, args.edits.lastName)
        },

        // Edit user's password
        async editUserPassword(_, args) {
            return await userService.editPassword(args.id, args.edits.newPwrd,
                args.edits.newPwrdConfirmation, args.edits.currentPwrd)
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
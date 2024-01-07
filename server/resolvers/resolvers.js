// Imports
import UserService from "../../services/user-service/user-service.js"
import PostService from "../../services/post-service/post-service.js"
import CommentService from "../../services/comment-service/comment-service.js"

const userService = new UserService()
const postService = new PostService()
const commentService = new CommentService()

await userService.init()
await postService.init()
await commentService.init()

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
            return await commentService.getComments()
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
        async post(parent) {
            let posts = await postService.getPosts()

            return posts.find((post) => post.id == parent.postId)
        },
        // Get comment's author
        async author(parent) {
            let users = await userService.getUsers()

            return users.find((user) => user.id == parent.authorId)
        }
    },
    Post: {
        // Get post's author
        async author(parent) {
            let users = await userService.getUsers()

            return users.find((user) => user.id == parent.authorId)
        },
        // Get post's comments
        async comments(parent) {
            let comments = await commentService.getComments()

            return comments.filter((comment) => comment.postId == parent.id)

        }
    },
    User: {
        // Get posts made by user
        async posts(parent) {
            let posts = await postService.getPosts()

            return posts.filter((post) => post.authorId == parent.id)
        },
        // Get comments made by user
        async comments(parent) {
            let comments = await commentService.getComments()

            return comments.filter((comment) => comment.authorId == parent.id)
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
            return await userService.editUserInfo(args.id, args.user.firstName, args.user.lastName)
        },

        // Edit user's password
        async editUserPassword(_, args) {
            return await userService.editPassword(args.id, args.user.newPwrd,
                args.user.newPwrdConfirmation, args.user.currentPwrd)
        },

        // Add new comment
        async addComment(_, args) {
            return await commentService.addComment(args.comment.content,
                args.comment.authorId, args.comment.postId)
        },

        // Edit comment
        async editComment(_, args) {
            return await commentService.editComment(args.id, args.edits.content)
        },

        // Remove comment

        async deleteComment(_, args) {
            return await commentService.removeComment(args.id)
        },

        // Create new Post
        async createPost(_, args) {
            return await postService.createPost(args.post.title,
                args.post.content, args.post.authorID)
        },

        // Edit a Post
        async editPost(_, args) {
            return await postService.editPost(args.id, args.edits.title, args.edits.content)
        },

        // Delete a post
        async deletePost(_, args) {
            return await postService.removePost(args.id)
        }
    }
}
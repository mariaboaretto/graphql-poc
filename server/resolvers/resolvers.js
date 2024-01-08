// Imports
import UserService from "../../services/user-service/user-service.js"
import PostService from "../../services/post-service/post-service.js"
import CommentService from "../../services/comment-service/comment-service.js"
import { ApolloError } from "apollo-server"
import { GraphQLError } from "graphql"

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
            try {
                let res = await userService.getUsers()
                return res
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }
        },
        // Get all posts
        async posts() {
            try {
                let res = await postService.getPosts()
                return res
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }
        },
        // Get all comments
        async comments() {
            try {
                let res = await commentService.getComments()
                return res
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }
        },
        // Get user by id
        async user(_, args) {
            try {
                let res = await userService.getUserById(args.id)
                return res
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }
        },
        // Get post by id
        async post(_, args) {
            try {
                let res = await postService.getPostById(args.id)
                return res
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }
        },
        // Get comment by id
        async comment(_, args) {
            try {
                let res = await commentService.getCommentById(args.id)
                return res
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }
        }
    },
    Comment: {
        // Get post associated with comment
        async post(parent) {
            try {
                let posts = await postService.getPosts()

                return posts.find((post) => post.id == parent.postId)
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }
        },
        // Get comment's author
        async author(parent) {
            try {
                let users = await userService.getUsers()

                return users.find((user) => user.id == parent.authorId)
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }
        }
    },
    Post: {
        // Get post's author
        async author(parent) {
            try {
                let users = await userService.getUsers()

                return users.find((user) => user.id == parent.authorId)
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }
        },
        // Get post's comments
        async comments(parent) {
            try {
                let comments = await commentService.getComments()

                return comments.filter((comment) => comment.postId == parent.id)
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }

        }
    },
    User: {
        // Get posts made by user
        async posts(parent) {
            try {
                let posts = await postService.getPosts()

                return posts.filter((post) => post.authorId == parent.id)
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }
        },
        // Get comments made by user
        async comments(parent) {
            try {
                let comments = await commentService.getComments()

                return comments.filter((comment) => comment.authorId == parent.id)
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }
        }
    },
    // Mutations
    Mutation: {
        // Delete user by id
        async deleteUser(_, args) {
            try {
                let res = await userService.removeUser(args.id)
                return res
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }
        },

        // Create user
        async createUser(_, args) {
            let user = {
                ...args.user
            }

            try {
                let res = await userService.createUser(user.firstName, user.lastName, user.email, user.username, user.password)
                return res
            } catch (error) {
                throw new ApolloError(error.message, error.code, { statusCode: 400 })
            }
        },

        // Edit user's info (first and last names)
        async editUserInfo(_, args) {
            try {
                let res = await userService.editUserInfo(args.id, args.user.firstName, args.user.lastName)
                return res
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }
        },

        // Edit user's password
        async editUserPassword(_, args) {
            try {
                let res = await userService.editPassword(args.id, args.user.newPwrd,
                    args.user.newPwrdConfirmation, args.user.currentPwrd)
                return res
            } catch (error) {
                throw new ApolloError(error.message, error.code, { statusCode: 400 })
            }
        },

        // Add new comment
        async addComment(_, args) {
            try {
                let res = await commentService.addComment(args.comment.content,
                    args.comment.authorId, args.comment.postId)
                return res
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }
        },

        // Edit comment
        async editComment(_, args) {
            try {
                let res = await commentService.editComment(args.id, args.edits.content)
                return res
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }
        },

        // Remove comment

        async deleteComment(_, args) {
            try {
                let res = await commentService.removeComment(args.id)
                return res
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }
        },

        // Create new Post
        async createPost(_, args) {
            try {
                let res = await postService.createPost(args.post.title,
                    args.post.content, args.post.authorID)
                return res
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }
        },

        // Edit a Post
        async editPost(_, args) {
            try {
                let res = await postService.editPost(args.id, args.edits.title, args.edits.content)
                return res
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }
        },

        // Delete a post
        async deletePost(_, args) {
            try {
                let res = await postService.removePost(args.id)
                return res
            } catch (error) {
                throw new ApolloError(error, 'BAD_REQUEST', { statusCode: 400 })
            }
        }
    }
}
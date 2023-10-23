import CommentRepository from "../../repositories/comment-repo/comment-repo.js";

export default class CommentService {
    constructor() {
        this.commentRepo = new CommentRepository
    }

    async init() {
        return await this.commentRepo.init()
    }

    async getComments() {
        return await this.commentRepo.getComments()
    }

    async getCommentById(id) {
        return await this.commentRepo.getCommentById(id)
    }

    async addComment(content, authorId, postId, publishDate) {
        return new Promise(async (resolve, reject) => {
            if (!content)
                return reject("Please enter the comment's content.")

            if (!authorId)
                return reject("Please enter the comment author's ID.")

            if (!postId)
                return reject("Please enter the post ID.")

            if (!publishDate)
                return reject("Please enter the publication date.")

            try {
                await this.commentRepo.addComment(content, authorId, postId, publishDate)

                resolve("Comment added successfully.")
            } catch (error) {
                reject(error)
            }
        })
    }

    async editComment(id, content) {
        return new Promise(async (resolve, reject) => {
            if (!content)
                return reject("Please enter the comment's content.")

            try {
                await this.commentRepo.editComment(id, content)

                resolve("Comment updated successfully.")
            } catch (error) {
                reject(error)
            }
        })
    }

    async removeComment(id) {
        return await this.commentRepo.removeComment(id)
    }
}
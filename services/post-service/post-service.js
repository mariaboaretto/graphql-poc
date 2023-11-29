import PostRepository from "../../repositories/post-repo/post-repo.js"

export default class PostService {
    constructor() {
        this.postRepo = new PostRepository()
    }

    // Async initializer that initiates repo's initializer
    async init() {
        return await this.postRepo.init()
    }

    async getPosts() {
        return await this.postRepo.getPosts()
    }

    async getPostById(id) {
        return await this.postRepo.getPostById(id)
    }

    async createPost(title, content, authorId) {
        return new Promise(async (resolve, reject) => {
            if (!title)
                return reject("Please enter a title.")

            if (!content) {
                return reject("Please enter the content.")
            }

            if (!authorId)
                return reject("Please enter the author's ID.")

            let publishDate = new Date().toISOString()

            try {
                await this.postRepo.addPost(title, content, authorId, publishDate)

                resolve("Post created successfully.")
            } catch (error) {
                reject(error)
            }
        })
    }

    async editPost(id, title, content) {
        return new Promise(async (resolve, reject) => {
            if (!title)
                return reject("Title cannot be empty.")

            if (!content)
                return reject("Content cannot be empty.")

            try {
                await this.postRepo.editPost(id, title, content)

                resolve("Post updated successfully.")
            } catch (error) {
                reject(error)

            }
        })
    }

    async removePost(id) {
        return await this.postRepo.removePost(id)
    }
}
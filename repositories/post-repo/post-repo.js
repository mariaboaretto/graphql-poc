// Imports
import sqlite3 from "sqlite3";
import Post from "./post.js";

export default class PostRepository {
    constructor() {
        this.db = new sqlite3.Database("./_data.db", (err) => {
            if (err) throw (err)
        })
    }

    // Async initializer (creates Posts table if it doesn't exist)
    async init() {
        return new Promise((resolve, reject) => {
            try {
                this.db.run(`CREATE TABLE IF NOT EXISTS posts(
                    post_id INTEGER PRIMARY KEY,
                    title TEXT NOT NULL,
                    content TEXT NOT NULL,
                    author_id INTEGER NOT NULL,
                    publicationDate TEXT NOT NULL,
                    FOREIGN KEY (author_id)
                        REFERENCES users(user_id)
                    )`, () => {
                    resolve("Table created successfully.")
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Adds a new Post to DB
    async addPost(title, content, authorId, publicationDate) {
        return new Promise((resolve, reject) => {
            try {
                this.db.run(`INSERT INTO posts(title, content, author_id, publicationDate) VALUES (?,?,?,?)`,
                    [title, content, authorId, publicationDate])
                resolve("Post created successfully.")
            } catch (error) {
                reject(error)
            }
        })
    }

    // Returns all Posts from DB
    async getPosts() {
        return new Promise((resolve, reject) => {
            try {
                let posts = []

                this.db.each("SELECT * FROM posts", [], (_, object) => {
                    let post = new Post(object.post_id, object.title, object.content, object.author_id, object.publicationDate)
                    posts.push(post)
                }, () => {
                    resolve(posts)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Returns Post by ID
    async getPostById(id) {
        return new Promise((resolve, reject) => {
            try {
                this.db.get(`SELECT * from posts WHERE post_id = ?`, [id], (_, post) => {
                    if (!post)
                        reject("Post not found.")

                    resolve(new Post(post.post_id, post.title, post.content, post.author_id, post.publicationDate))
                })

            } catch (err) {
                reject(err)
            }
        })
    }

    // Updates a Post's information (title or content)
    async editPost(id, title, content) {
        return new Promise((resolve, reject) => {
            try {
                let updateQuery = `UPDATE posts SET `

                if (title)
                    updateQuery += `title = "${title}"${content ? ", " : " "}`

                if (content)
                    updateQuery += `content = "${content}" `

                updateQuery += `WHERE post_id = ${id}`

                this.db.run(updateQuery, [], () => resolve("Post updated successfully."))
            } catch (error) {
                reject(error)
            }
        })
    }

    // Removes a Post from the DB
    async removePost(id) {
        return new Promise((resolve, reject) => {
            try {
                this.db.run(`DELETE FROM posts WHERE post_id = ?`, [id])
                resolve("Post deleted successfully.")
            } catch (error) {
                reject(error)
            }
        })
    }
}
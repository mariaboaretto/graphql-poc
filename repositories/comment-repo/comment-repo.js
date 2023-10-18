// Imports
import sqlite3 from "sqlite3";
import Comment from "./comment.js";

export default class CommentRepository {
    constructor() {
        this.db = new sqlite3.Database("./_data.db", (err) => {
            if (err) throw (err)
        })
    }

    // Async initializer (creates Comments table if it doesn't exist)
    async init() {
        return new Promise((resolve, reject) => {
            try {
                this.db.run(`CREATE TABLE IF NOT EXISTS comments(
                    comment_id INTEGER PRIMARY KEY,
                    content TEXT NOT NULL,
                    author_id INTEGER NOT NULL,
                    post_id INTEGER NOT NULL,
                    publish_date TEXT NOT NULL,
                    FOREIGN KEY (author_id)
                        REFERENCES users(user_id),
                    FOREIGN KEY (post_id)
                        REFERENCES posts(post_id)
                    )`, () => {
                    resolve("Table created successfully.")
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Adds new comment to DB
    async addComment(content, authorId, postId, publishDate) {
        return new Promise((resolve, reject) => {
            try {
                this.db.run(`INSERT INTO comments(content, author_id, post_id, publish_date) VALUES (?,?,?,?)`,
                    [content, authorId, postId, publishDate])
                resolve("Comment created successfully.")
            } catch (error) {
                reject(error)
            }
        })
    }

    // Returns all comments
    async getComments() {
        return new Promise((resolve, reject) => {
            try {
                let comments = []

                this.db.each("SELECT * FROM comments", [], (_, object) => {
                    let comment = new Comment(object.comment_id, object.content, object.author_id, object.post_id, object.publish_date)
                    comments.push(comment)
                }, () => {
                    resolve(comments)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Gets a comment by ID
    async getCommentById(id) {
        return new Promise((resolve, reject) => {
            try {
                this.db.get(`SELECT * from comments WHERE comment_id = ?`, [id], (_, comment) => {
                    if (!comment)
                        reject("Post not found.")

                    resolve(new Comment(comment.comment_id, comment.content, comment.author_id, comment.post_id, comment.publish_date))
                })

            } catch (err) {
                reject(err)
            }
        })
    }

    // Updates comment in DB
    async editComment(id, content) {
        return new Promise((resolve, reject) => {
            try {
                this.db.run(`UPDATE comments SET content = ? WHERE comment_id = ?`, [content, id],
                    () => resolve("Comment updated successfully."))
            } catch (error) {
                reject(error)
            }
        })
    }


    // Removes Comment from DB
    async removeComment(id) {
        return new Promise((resolve, reject) => {
            try {
                this.db.run(`DELETE FROM comments WHERE comment_id = ?`, [id])
                resolve("Comment deleted successfully.")
            } catch (error) {
                reject(error)
            }
        })
    }
}
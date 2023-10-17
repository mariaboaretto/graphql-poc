// Imports
import sqlite3 from "sqlite3";
import User from "./user.js"
import crypto from "crypto"

export default class UserRepository {
    constructor() {
        this.db = new sqlite3.Database("./_data.db", (err) => {
            if (err) {
                throw (err)
            }
        })
    }

    // Async initializer (creates table if it doesn't exist)
    async init() {
        return new Promise((resolve, reject) => {
            this.db.run(`CREATE TABLE IF NOT EXISTS users(
                user_id INTEGER PRIMARY KEY,
                f_name TEXT NOT NULL,
                l_name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
                )`, (err) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve("Table created successfully.")
                }
            })
        })
    }

    // Adds a new user to the database
    async createUser(f_name, l_name, email, username, pwrd) {
        let hashedPassword = crypto.createHash("sha256", pwrd).digest("hex")

        return new Promise((resolve, reject) => {
            try {
                // Checking if a user with this username already exists in db
                // Check if email already exists in db

                this.db.run(`INSERT INTO users(f_name, l_name, email, username, password) VALUES (?,?,?,?,?)`,
                    [f_name, l_name, email, username, hashedPassword])
                resolve("User created successfully.")
            } catch (error) {
                reject(error)
            }
        })
    }

    // Returns all existing users
    async getAllUsers() {
        return new Promise((resolve, reject) => {
            let users = []

            try {
                this.db.each("SELECT * FROM users", [], (_, row) => {
                    let user = new User(row.user_id, row.f_name, row.l_name, row.email, row.username, row.password)
                    users.push(user)
                }, () => {
                    resolve(users)
                })
            } catch (error) {
                reject(error)
            }
        })
    }

    // Returns user by id
    async getUserById(id) {
        return new Promise((resolve, reject) => {
            try {
                this.db.get(`SELECT * from users WHERE user_id = ?`, [id], (_, user) => {
                    if (!user) {
                        reject("User not found.")
                    }

                    resolve(new User(user.user_id, user.f_name, user.l_name, user.email, user.username, user.password))
                })

            } catch (err) {
                reject(err)
            }
        })
    }

    // Edits user first and last name
    async editUser(id, f_name, l_name) {


    }

    // Removes user from database
    async removeUser(id) {
        return new Promise((resolve, reject) => {
            try {
                this.db.run(`DELETE FROM users WHERE user_id = ?`, [id])
                resolve("User deleted successfully.")
            } catch (error) {
                reject(error)
            }
        })
    }
}
import UserRepository from "../../repositories/user-repo/user-repository.js"
import crypto from "crypto"

export default class UserService {
    constructor() {
        this.userRepo = new UserRepository()
    }

    async init() {
        return await this.userRepo.init()
    }

    // Helper method to hash passwords
    hashString(str) {
        return crypto.createHash("sha256", str).update(str).digest("hex")
    }

    async getUsers() {
        return await this.userRepo.getAllUsers()
    }

    async getUserById(id) {
        return await this.userRepo.getUserById(id)
    }

    async createUser(f_name, l_name, email, username, pword) {
        return new Promise(async (resolve, reject) => {
            // Checks if first name is not empty
            if (!f_name)
                return reject("Please insert user's first name.")

            // Checks if last name is not empty
            if (!l_name)
                return reject("Please insert user's last name.")

            // Checks if email is not empty
            if (!email)
                return reject("Please insert user's email.")

            // Checks if username is not empty
            if (!username)
                return reject("Please insert user's username.")

            try {
                await this.userRepo.createUser(f_name, l_name, email, username, this.hashString(pword))
                resolve("User created successfully")
            } catch (e) {
                reject(e)
            }
        })
    }

    async editUserInfo(id, f_name, l_name) {
        return new Promise(async (resolve, reject) => {
            if (!f_name)
                return reject("Please insert user's first name")

            if (!l_name)
                return reject("Please insert user's last name")

            try {
                await this.userRepo.editUser(1, f_name, l_name)
                resolve("User updated successfully.")
            } catch (error) {
                reject(error)
            }
        })
    }

    async editPassword(id, newPwrd, newPwrdConfirmation, currentPwrd) {
        return new Promise(async (resolve, reject) => {
            try {
                // Checking if old password matches with DB password
                let user = await this.getUserById(id)

                if (this.hashString(currentPwrd) != user.getPassword())
                    return reject("Current password is incorrect.")

                // Checking if new password and new password confirmation match
                if (newPwrd != newPwrdConfirmation)
                    return reject("Passwords do not match.")

                // Updating user password in DB
                await this.userRepo.editPassword(id, this.hashString(newPwrd))

                resolve("Password updated succcessfully.")
            } catch (error) {
                resolve(error)
            }
        })
    }

    async removeUser(id) {
        return new Promise(async (resolve, reject) => {
            try {
                if (! await this.getUserById(id))
                    return reject("User not found.")

                await this.userRepo.removeUser(id)

                resolve("User deleted successfully.")

            } catch (error) {
                reject(error)
            }
        })
    }
}
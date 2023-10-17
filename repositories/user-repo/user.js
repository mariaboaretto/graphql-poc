export default class User {
    constructor(id, f_name, l_name, email, username, password) {
        this.id = id
        this.f_name = f_name
        this.l_name = l_name
        this.email = email
        this.username = username
        this.password = password
    }

    getID() {
        return this.id
    }

    getFirstName() {
        return this.f_name
    }

    getLastName() {
        return this.l_name
    }

    getFullName() {
        return this.getFirstName() + " " + this.getLastName()
    }

    getUsername() {
        return this.username
    }

    getPassword() {
        return this.password
    }

    updateFirstName(firstName) {
        this.f_name = firstName
    }

    updateLastName(lastName) {
        this.l_name = lastName
    }

    updatePassword(pwrd) {
        this.password = pwrd
    }
}
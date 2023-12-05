import { useEffect, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { CREATE_USER_MUTATION } from "../GraphQL/Mutations.js"

export default function UserDetailsForm(props) {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()

    const [err, setErr] = useState("")

    const [createUser, { error }] = useMutation(CREATE_USER_MUTATION)

    function handleSubmit(e) {
        e.preventDefault()

        if (password != passwordConfirm) {
            setErr("Passwords do not match!")
            return
        }
        else {
            setErr("")
        }

        createUser({
            variables: {
                user: {
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    username: username,
                    password: password
                }
            }
        })
    }

    return <form onSubmit={handleSubmit}>
        <div className="grid">
            <label>First Name<span className="required-field">*</span>
                <input
                    id="first-name"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    value={props.user ? props.user.f_name : ""} />
            </label>

            <label>Last Name<span className="required-field">*</span>
                <input id="last-name"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    value={props.user ? props.user.l_name : ""} />
            </label>
        </div>

        <div className="grid">
            <label>Email<span className="required-field">*</span>
                <input
                    id="email"
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={props.user ? true : false}
                    value={props.user ? props.user.email : ""} />
            </label>

            <label>Username<span className="required-field">*</span>
                <input id="username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={props.user ? true : false}
                    value={props.user ? props.user.username : ""} />
            </label>
        </div>

        <div className="grid">
            <label>Password<span className="required-field">*</span>
                <input
                    id="pword"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required />
            </label>

            <label>Re-enter Password<span className="required-field">*</span>
                <input id="pword-confirmation"
                    type="password"
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required />
                <small className="error">{err}</small>
            </label>
        </div>

        <button type="submit">{props.user ? "Update User" : "Create User"}</button>
    </form>
}
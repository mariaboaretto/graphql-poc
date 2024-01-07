import { useState } from "react"
import MsgModal from "../MsgModal/MsgModal.js"
import "./UserDetailsForm.css"

export default function UserDetailsForm(props) {
    // Form variables
    // If there's an user, set their first and last names as default values
    const [firstName, setFirstName] = useState(props.user ? props.user.f_name : null)
    const [lastName, setLastName] = useState(props.user ? props.user.l_name : null)
    const [username, setUsername] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [passwordConfirm, setPasswordConfirm] = useState()

    // Tracks form errors to display appropriate msg to the user
    const [err, setErr] = useState("")
    const [modalContent, setModalContent] = useState(props.successfulMsg)
    const [showModal, setShowModal] = useState(false)

    function handleSubmit(e) {
        e.preventDefault()

        // If passwords don't match, set error message
        if (password !== passwordConfirm) {
            setErr("Passwords do not match!")
            return
        }
        else {
            setErr("")
        }

        // Variables to be sent in graphql mutation
        let vars = {
            user: {
                firstName: firstName,
                lastName: lastName,
            }
        }

        // If there's no user, add email, username and password properties
        if (!props.user) {
            vars.user.email = email
            vars.user.username = username
            vars.user.password = password
        } else {
            // Otherwise, add ID of user to be edited
            vars.editUserInfoId = props.user.id
        }

        // Execute mutation and set modal content if there are any errors
        try {
            props.onSubmit({
                variables: vars
            })
        } catch (error) {
            setModalContent(error)

        }

        setShowModal(true)
    }

    return <form onSubmit={handleSubmit}>
        <div className="grid">
            <label>First Name<span className="required-field">*</span>
                <input
                    id="first-name"
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    defaultValue={props.user ? props.user.f_name : ""} />
            </label>

            <label>Last Name<span className="required-field">*</span>
                <input id="last-name"
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                    defaultValue={props.user ? props.user.l_name : ""} />
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
                    defaultValue={props.user ? props.user.email : ""} />
            </label>

            <label>Username<span className="required-field">*</span>
                <input id="username"
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={props.user ? true : false}
                    defaultValue={props.user ? props.user.username : ""} />
            </label>
        </div>

        {props.user ? <a href={`/edit-password/${props.user.id}`} id="edit-pword-link">Edit Password...</a> :
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
                        required
                        aria-invalid={err ? true : null} />
                    <small className="error">{err}</small>
                </label>
            </div>}

        <button id="user-details-submit-btn" type="submit">{props.user ? "Update User" : "Create User"}</button>

        {showModal ? <MsgModal title={err ? "Error" : "Success"} content={modalContent} redirectLink="/users" /> : null}
    </form>
}
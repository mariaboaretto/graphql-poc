import { useMutation } from "@apollo/client"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { EDIT_USER_PASSWORD_MUTATION } from "../GraphQL/Mutations"
import MsgModal from "../MsgModal/MsgModal"

export default function EditPasswordForm(props) {
    const userId = useParams().id

    // Form variables
    const [currPassword, setCurrPassword] = useState()
    const [newPassword, setNewPassword] = useState()
    const [newPasswordConfirm, setNewPasswordConfirm] = useState()

    const [showModal, setShowModal] = useState()

    // Updates graphql error with message
    const [graphQLErr, setGraphQLErr] = useState()

    // Tracks form errors
    const [formError, setFormError] = useState("")

    // GraphQL edit password mutation
    const [updatePassword] = useMutation(EDIT_USER_PASSWORD_MUTATION, {
        onError: (error) => {
            setGraphQLErr(error.message)
            setShowModal(false)
        },
        onCompleted: () => {
            setShowModal(true)
        }
    })

    function handleSubmit(e) {
        // Preventing default submission
        e.preventDefault()

        // Resetting GraphQL error message
        setGraphQLErr(null)

        // Validating passwords
        if (newPassword !== newPasswordConfirm) {
            setFormError("Passwords do not match!")
            return
        } else {
            // Resetting password validation error message
            setFormError("")
        }

        // Executing password update mutation
        updatePassword({
            variables: {
                editUserPasswordId: userId,
                user: {
                    currentPwrd: currPassword,
                    newPwrd: newPassword,
                    newPwrdConfirmation: newPasswordConfirm
                }
            }
        })
    }

    return <form onSubmit={handleSubmit}>
        <label htmlFor="curr-password">Enter current password<span className="required-field">*</span>
            <input
                id="curr-password"
                type="password"
                onChange={(e) => setCurrPassword(e.target.value)}
                aria-invalid={graphQLErr ? true : null}
                required
            />
            <small className="error">{graphQLErr}</small>
        </label>

        <label htmlFor="new-password">Enter new password<span className="required-field">*</span>
            <input
                id="new-password"
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
                aria-invalid={formError ? true : null}
                required
            />
        </label>

        <label htmlFor="confirm-new-password">Re-enter new password<span className="required-field">*</span>
            <input
                id="confirm-new-password"
                type="password"
                onChange={(e) => setNewPasswordConfirm(e.target.value)}
                aria-invalid={formError ? true : null}
                required
            />
            <small className="error">{formError}</small>
        </label>

        <button id="user-password-submit-btn" type="submit">Update Password</button>

        {showModal ? <MsgModal title="Success!" content="Password updated successfully!" redirectLink="/users" /> : null}
    </form>
}
import { useMutation } from "@apollo/client"
import { DELETE_USER_MUTATION } from "../GraphQL/Mutations"
import { useState } from "react"
import DelUserModal from "../DelUserModal/DelUserModal"

export default function UserActionBtns(props) {
    const [deleteUser, { error }] = useMutation(DELETE_USER_MUTATION)
    const [showModal, setShow] = useState(false)

    return <div id="action-btns">
        <a id="edit-user-btn" href={`/edit-user/${props.user.id}`} role="button">
            Edit
        </a>
        <a id="delete-user-btn" href="#" role="button" data-target="modal-example" onClick={() => setShow(true)}>
            Delete
        </a>

        {showModal ? <DelUserModal handleClose={setShow}/> : null}
    </div>
}
import { useMutation } from "@apollo/client"
import { DELETE_USER_MUTATION } from "../GraphQL/Mutations"
import { useState } from "react"
import DelModal from "../DelModal/DelModal"

export default function UserActionBtns(props) {
    const [showModal, setShow] = useState(false)

    return <div id="action-btns">
        <a id="edit-user-btn" href={`/edit-user/${props.userId}`} role="button">
            Edit
        </a>
        <a id="delete-user-btn" href="#" role="button" data-target="modal-example" onClick={() => setShow(true)}>
            Delete
        </a>

        {showModal ? <DelModal
            id={props.userId}
            handleClose={setShow}
            handleClick={props.handleClick}
            title="Are you sure you want to delete this user?"
            redirectLink="/users"/>
            : null}
    </div>
}
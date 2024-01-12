import { useMutation } from "@apollo/client"
import { DELETE_USER_MUTATION } from "../GraphQL/Mutations"
import { useState } from "react"
import DelModal from "../DelModal/DelModal"
import { Link } from "react-router-dom"

export default function UserActionBtns(props) {
    const [showModal, setShow] = useState(false)

    return <div id="action-btns">
        <Link id="edit-user-btn" to={`/edit-user/${props.userId}`} role="button">
            Edit
        </Link>
        <Link id="delete-user-btn" role="button" data-target="modal-example" onClick={() => setShow(true)}>
            Delete
        </Link>

        {showModal ? <DelModal
            id={props.userId}
            handleClose={setShow}
            handleClick={props.handleClick}
            title="Are you sure you want to delete this user?"
            redirectLink="/users" />
            : null}
    </div>
}
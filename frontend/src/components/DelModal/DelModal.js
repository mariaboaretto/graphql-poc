import { useState } from "react"
import { Link } from "react-router-dom"

export default function DelModal(props) {
    function handleClick() {
        props.handleClick(props.id)
        props.handleClose(false)
    }
    return <dialog id="del-user-modal" open>
        <article>
            <Link to={props.cancelRedirect}
                aria-label="Close"
                className="close"
                onClick={() => props.handleClose(false)}>
            </Link>
            <h3>{props.title}</h3>
            <p>
                This action cannot be undone.
            </p>
            <footer>
                <Link to={props.cancelRedirect}
                    role="button"
                    className="secondary"
                    onClick={() => props.handleClose(false)}>
                    Cancel
                </Link>
                <Link to={props.redirectLink}
                    role="button"
                    onClick={handleClick}>
                    Confirm
                </Link>
            </footer>
        </article>
    </dialog>
}
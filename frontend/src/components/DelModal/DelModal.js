import { useState } from "react"

export default function DelModal(props) {
    function handleClick() {
        props.handleClick(props.id)
        props.handleClose(false)
    }
    return <dialog id="del-user-modal" open>
        <article>
            <a href={props.cancelRedirect}
                aria-label="Close"
                className="close"
                onClick={() => props.handleClose(false)}>
            </a>
            <h3>{props.title}</h3>
            <p>
                This action cannot be undone.
            </p>
            <footer>
                <a href={props.cancelRedirect}
                    role="button"
                    className="secondary"
                    onClick={() => props.handleClose(false)}>
                    Cancel
                </a>
                <a href={props.redirectLink}
                    role="button"
                    onClick={handleClick}>
                    Confirm
                </a>
            </footer>
        </article>
    </dialog>
}
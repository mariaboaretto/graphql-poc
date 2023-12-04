import { useState } from "react"

export default function DelUserModal(props) {
    return <dialog id="del-user-modal" open>
        <article>
            <a href="#close"
                aria-label="Close"
                className="close"
                onClick={() => props.handleClose(false)}>
            </a>
            <h3>Are you sure you want to delete this user?</h3>
            <p>
                This action cannot be undone.
            </p>
            <footer>
                <a href="#cancel"
                    role="button"
                    className="secondary"
                    onClick={() => props.handleClose(false)}>
                    Cancel
                </a>
                <a href="#confirm"
                    role="button">
                    Confirm
                </a>
            </footer>
        </article>
    </dialog>
}
import { useState } from "react";
import DelModal from "../DelModal/DelModal";
import { useMutation } from "@apollo/client";
import { DELETE_POST_MUTATION } from "../GraphQL/Mutations";

export default function PostSettingsOptions(props) {
    const [show, setShow] = useState(false)
    const [delPost, { error }] = useMutation(DELETE_POST_MUTATION)

    function removePost(id) {
        delPost({
            variables: {
                deletePostId: id
            }
        })
    }

    return <div className="post-settings-icons">
        <a href={`/edit-post/${props.id}`} data-tooltip="Edit post">
            <i className="fa-regular fa-pen-to-square settings-i"></i>
        </a>
        <a href="#" data-tooltip="Delete post" onClick={() => setShow(true)}>
            <i className="fa-regular fa-trash-can settings-i"></i>
        </a>

        {show ? <DelModal
            title="Are you sure you want to delete this post?"
            handleClose={setShow}
            handleClick={removePost}
            id={props.id}
            redirectLink="/"
        />
            : null}
    </div>
}
import { useState } from "react";
import DelModal from "../DelModal/DelModal";
import { useMutation } from "@apollo/client";
import { DELETE_POST_MUTATION } from "../GraphQL/Mutations";
import { Link } from "react-router-dom";
import { GET_POSTS } from "../GraphQL/Queries";

export default function PostSettingsOptions(props) {
    const [show, setShow] = useState(false)
    const [delPost, { error }] = useMutation(DELETE_POST_MUTATION, {
        refetchQueries: [GET_POSTS, "GetPosts"]
    })

    function removePost(id) {
        delPost({
            variables: {
                deletePostId: id
            }
        })
    }

    return <div className="post-settings-icons">
        <Link to={`/edit-post/${props.id}`} data-tooltip="Edit post">
            <i className="fa-regular fa-pen-to-square settings-i"></i>
        </Link>
        <Link data-tooltip="Delete post" onClick={() => setShow(true)}>
            <i className="fa-regular fa-trash-can settings-i"></i>
        </Link>

        {show ? <DelModal
            title="Are you sure you want to delete this post?"
            handleClose={setShow}
            handleClick={removePost}
            id={props.id}
            redirectLink="/"
            cancelRedirect="#"
        />
            : null}
    </div>
}
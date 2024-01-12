import { useMutation } from "@apollo/client"
import { DELETE_COMMENT_MUTATION } from "../GraphQL/Mutations"
import { useState } from "react"
import DelModal from "../DelModal/DelModal"
import { GET_COMMENTS_BY_POST } from "../GraphQL/Queries"

export default function DeleteCommentBtn(props) {
    const [deleteComment, { delCommentErr }] = useMutation(DELETE_COMMENT_MUTATION, {
        refetchQueries: [GET_COMMENTS_BY_POST, "GetComments"]
    })
    
    const [showModal, setShowModal] = useState(false)

    function handleClick() {
        setShowModal(true)
    }

    function removeComment() {
        deleteComment({
            variables: {
                deleteCommentId: props.commentId
            }
        })
    }

    return <>
        <a href="#" data-tooltip="Delete comment" onClick={handleClick}>
            <i className="fa-regular fa-trash-can settings-i"></i>
        </a>

        {showModal ? <DelModal
            title="Are you sure you want to delete this comment?"
            handleClose={setShowModal}
            handleClick={removeComment}
            redirectLink={`/post/${props.postId}`}
            cancelRedirect="#comment-section"
        /> : null}

    </>
}
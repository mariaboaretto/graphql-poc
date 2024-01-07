import CommentList from "../CommentList/CommentList"
import CreateCommentSection from "../CreateCommentSection/CreateCommentSection"
import "./CommentSection.css"
import { useQuery } from "@apollo/client";
import { GET_COMMENTS_BY_POST } from "../GraphQL/Queries";
import { useEffect, useState } from "react";

export default function CommentSection(props) {
    const [comments, setComments] = useState()

    // GraphQL query
    const { commentsErr, _, data } = useQuery(GET_COMMENTS_BY_POST, {
        variables: {
            postId: props.postId
        }
    })

    useEffect(() => {
        if (data) {
            setComments(data.post.comments)
        }
    }, [data])

    if (!comments) {
        return <p>Loading comments...</p>
    }


    return <div id="comment-section">
        <p id="total-comments">Comments ({comments.length})</p>
        <CreateCommentSection postId={props.postId} />

        <CommentList comments={comments} postId={props.postId}/>
    </div>
}
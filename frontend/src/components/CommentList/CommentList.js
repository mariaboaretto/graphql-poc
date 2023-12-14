import { useQuery } from "@apollo/client";
import CommentCard from "./CommentCard/CommentCard";
import { GET_COMMENTS_BY_POST } from "../GraphQL/Queries";
import { useEffect, useState } from "react";

export default function CommentList(props) {
    const [comments, setComments] = useState()

    // GraphQL query
    const { commentsErr, _, data } = useQuery(GET_COMMENTS_BY_POST, {
        variables: {
            postId: props.postId
        }
    })

    // renders a comment card for every comment
    function renderCard(comment) {
        let parsedDate = new Date(comment.postedOn).toDateString().split(" ")
        let publishDate = parsedDate[1] + " " + parsedDate[2] + ", " + parsedDate[3]

        return <CommentCard
            key={comment.commentId}
            commentId={comment.commentId}
            authorName={comment.author.username}
            content={comment.content}
            publishDate={publishDate}
            postId={props.postId}
        />
    }

    useEffect(() => {
        if (data) {
            setComments(data.post.comments)
        }
    }, [data])

    if (!comments) {
        return <p>Loading comments...</p>
    }

    return <div id="comment-list">
        {comments.map(renderCard)}
    </div>

}
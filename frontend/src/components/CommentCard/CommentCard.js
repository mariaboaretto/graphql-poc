import DeleteCommentBtn from "../DeleteCommentBtn/DeleteCommentBtn"
import "./CommentCard.css"

export default function CommentCard(props) {
    return <div id="comment-card">
        <span id="comment-author"><b>{props.authorName}</b> &#183; </span>
        <span id="publish-date">{props.publishDate}  &#183;</span>
        <DeleteCommentBtn commentId={props.commentId} postId={props.postId} />
        <p id="card-comment-content">{props.content}</p>

    </div>
}
import CommentList from "../CommentList/CommentList"
import CreateCommentSection from "../CreateCommentSection/CreateCommentSection"
import "./CommentSection.css"

export default function CommentSection(props) {
    return <div id="comment-section">
        <p id="total-comments">Comments (0)</p>
        <CreateCommentSection postId={props.postId} />

        <CommentList postId={props.postId}/>
    </div>
}
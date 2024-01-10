import { Link } from "react-router-dom"
import "./PostCard.css"

export default function PostCard(props) {
    return <article className="post-card">
        <Link to={`/post/${props.id}`} id="post-card-link">
            <img id="post-image" src="data:image/png;base64,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" />
            <div id="post-header">
                {props.title}
            </div>

            <div id="post-footer">
                <span id="author-name">{props.author ? props.author.f_name + " " + props.author.l_name : "[deleted user]"}</span>
                <span id="publishDate"> &#183; {props.publicationDate}</span>
            </div>
        </Link>
    </article>
}
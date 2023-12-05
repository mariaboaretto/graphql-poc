import { Link } from "react-router-dom"
import "./PostCard.css"

export default function PostCard(props) {
    return <section className="post-card">
        <div>
            <p id="post-card-top-section">
                <span id="author-name">{props.author.f_name + " " + props.author.l_name} &#183; </span>
                <span id="post-date">{props.publicationDate}</span>
                <i id="post-settings-icon" className="fa-solid fa-ellipsis"></i>
            </p>
        </div>

        <Link to={`/post/${props.id}`} className="post-page-link">
            <div id="title">
                <span id="card-title">{props.title}</span>
            </div>

            <div className="content-preview">
                {props.content}
            </div>
        </Link>
    </section>
}
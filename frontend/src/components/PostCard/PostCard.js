import { Link } from "react-router-dom"
import "./PostCard.css"
import PostSettingsOptions from "../PostSettingsOptions/PostSettingsOptions"

export default function PostCard(props) {
    return <section className="post-card">
        <div id="post-card-top-section">
            <div className="top-section-info">
                <span id="author-name">{props.author.f_name + " " + props.author.l_name} &#183; </span>
                <span id="post-date">{props.publicationDate}</span>
            </div>
            <PostSettingsOptions id={props.id}/>
        </div>

        <div id="title">
            <Link to={`/post/${props.id}`} id="card-title" className="post-page-link">
                {props.title}
            </Link>
        </div>

        <div className="content-preview">
            <Link to={`/post/${props.id}`} className="post-page-link">
                {props.content}
            </Link>
        </div>
    </section>
}
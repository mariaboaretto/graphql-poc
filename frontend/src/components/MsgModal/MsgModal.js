import { Link } from "react-router-dom";

export default function MsgModal(props) {
    return <dialog open>
        <article>
            <h4>{props.title}</h4>
            <p>
                {props.content}
            </p>
            <footer>
                <Link to={props.redirectLink} role="button" className="secondary">Close</Link>
            </footer>
        </article>
    </dialog>
}
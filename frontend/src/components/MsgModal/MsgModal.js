export default function MsgModal(props) {
    return <dialog open>
        <article>
            <h4>{props.title}</h4>
            <p>
                {props.content}
            </p>
            <footer>
                <a href={props.redirectLink} role="button" className="secondary">Close</a>
            </footer>
        </article>
    </dialog>
}
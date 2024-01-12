import { Link } from "react-router-dom"
import "./Header.css"

export default function Header() {
    return <nav className="container-fluid">
        <ul>
            <li><strong>GraphQL POC</strong></li>
        </ul>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/new-post">Write Post</Link></li>
            <li>
                <details role="list" dir="rtl">
                    <summary aria-haspopup="listbox" role="link">Users</summary>
                    <ul role="listbox">
                        <li><Link to="/users">All Users</Link></li>
                        <li><Link to="/create-user">Create User</Link></li>
                    </ul>
                </details>
            </li>
        </ul>
    </nav>
}
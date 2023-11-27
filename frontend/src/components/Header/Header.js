import "./Header.css"

export default function Header() {
    return <nav className="container-fluid">
        <ul>
            <li><strong>Logo</strong></li>
        </ul>
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/new-post">Write Post</a></li>
            <li>
                <details role="list" dir="rtl">
                    <summary aria-haspopup="listbox" role="link">Users</summary>
                    <ul role="listbox">
                        <li><a href="/users">All Users</a></li>
                        <li><a href="/create-user">Create User</a></li>
                    </ul>
                </details>
            </li>
        </ul>
    </nav>
}
import "./CreateUser.css"

export default function CreateUserPage() {
    return <div className="container">
        <h3>New User</h3>

        <form>
            <div className="grid">
                <label>First Name<span className="required-field">*</span>
                    <input id="first-name" type="text" />
                </label>

                <label for="last-name">Last Name<span className="required-field">*</span>
                    <input id="last-name" type="text" />
                </label>
            </div>

            <div className="grid">
                <label for="email">Email<span className="required-field">*</span>
                    <input id="email" type="email" />
                </label>

                <label for="username">Username<span className="required-field">*</span>
                    <input id="username" type="text" />
                </label>
            </div>

            <button type="submit">Create User</button>
        </form>
    </div>
}
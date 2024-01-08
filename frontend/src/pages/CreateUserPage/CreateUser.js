import UserDetailsForm from "../../components/UserDetailsForm/UserDetailsForm"
import "./CreateUser.css"

export default function CreateUserPage() {
    return <div className="container">
        <h3>New User</h3>
        <UserDetailsForm successfulMsg="User created successfully!" />
    </div>
}
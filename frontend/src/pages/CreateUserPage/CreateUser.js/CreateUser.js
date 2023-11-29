import CreateUserForm from "../../../components/CreateUserForm/CreateUserForm"
import "./CreateUser.css"

export default function CreateUserPage() {
    return <div className="container">
        <h3>New User</h3>
        <CreateUserForm />
    </div>
}
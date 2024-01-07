import { CREATE_USER_MUTATION } from "../../components/GraphQL/Mutations.js"
import UserDetailsForm from "../../components/UserDetailsForm/UserDetailsForm"
import "./CreateUser.css"
import { useMutation } from "@apollo/client"

export default function CreateUserPage() {
    const [createUser, { data, loading, error }] = useMutation(CREATE_USER_MUTATION)

    return <div className="container">
        <h3>New User</h3>
        <UserDetailsForm onSubmit={createUser} successfulMsg="User created successfully!" />
    </div>
}
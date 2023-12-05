import { useParams } from "react-router-dom";
import UserDetailsForm from "../../components/UserDetailsForm/UserDetailsForm";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../components/GraphQL/Queries";
import { useEffect, useState } from "react";

export default function EditUserPage() {
    const id = useParams().id
    const [user, setUser] = useState()

    const { error, loading, data } = useQuery(GET_USER, {
        variables: {
            userId: id
        }
    })

    useEffect(() => {
        if (data) {
            setUser(data.user)
        }
    }, [data])

    return <div className="container">
        <h3>Edit User</h3>
        {user ? <UserDetailsForm user={user} /> : null}
    </div>
}
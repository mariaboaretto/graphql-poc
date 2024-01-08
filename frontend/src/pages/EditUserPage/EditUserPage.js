import { useParams } from "react-router-dom";
import UserDetailsForm from "../../components/UserDetailsForm/UserDetailsForm";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../../components/GraphQL/Queries";
import { useEffect, useState } from "react";
import { EDIT_USER_MUTATION } from "../../components/GraphQL/Mutations";

export default function EditUserPage() {
    const id = useParams().id
    const [user, setUser] = useState()

    // Fetching user to be edited
    const { getErr, getLoading, data: getData } = useQuery(GET_USER, {
        variables: {
            userId: id
        }
    })

    useEffect(() => {
        if (getData) {
            setUser(getData.user)
        }
    }, [getData])

    return <div className="container">
        <h3>Edit User</h3>
        {user ? <UserDetailsForm user={user} successfulMsg="User Updated Successfully!" /> : null}
    </div>
}
import { useMutation, useQuery } from "@apollo/client"
import { GET_USERS } from "../GraphQL/Queries.js"
import { useEffect, useState } from "react"
import "./UserTable.css"
import UserActionBtns from "../UserActionBtns/UserActionBtns.js"
import { DELETE_USER_MUTATION } from "../GraphQL/Mutations.js"

export default function UserTable() {
    const { error, _, data } = useQuery(GET_USERS)
    const [deleteUser, { err }] = useMutation(DELETE_USER_MUTATION)
    const [users, setUsers] = useState([])

    function delUser(userId) {
        deleteUser({
            variables: {
                deleteUserId: userId
            }
        })
    }

    function renderTableRow(user) {
        return <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.f_name + " " + user.l_name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
                <UserActionBtns userId={user.id} handleClick={delUser} />
            </td>
        </tr>
    }

    useEffect(() => {
        if (data) {
            setUsers(data.users)
        }
    }, [data])

    if (!users) {
        return <article aria-busy="true"></article>
    }

    return <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {users.map(renderTableRow)}
        </tbody>
    </table>
}
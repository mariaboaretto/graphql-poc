import { useQuery } from "@apollo/client"
import { GET_USERS } from "../GraphQL/Queries.js"
import { useEffect, useState } from "react"
import "./UserTable.css"
import UserActionBtns from "../UserActionBtns/UserActionBtns.js"

export default function UserTable() {
    const { error, loading, data } = useQuery(GET_USERS)
    const [users, setUsers] = useState([])

    function renderTableRow(user) {
        return <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.f_name + " " + user.l_name}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
                <UserActionBtns user={user} />
            </td>
        </tr>
    }

    useEffect(() => {
        if (data)
            setUsers(data.users)
    }, [data])

    if (users.length == 0) {
        return <em>No data to display...</em>
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
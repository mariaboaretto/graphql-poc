import "./CreatePostForm.css"
import { CREATE_POST_MUTATION } from "../GraphQL/Mutations.js"
import { useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { GET_USERNAMES } from "../GraphQL/Queries.js"

export default function CreatePostForm() {
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [authorID, setAuthorID] = useState()
    const [users, setUsers] = useState()

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION)
    const { err, loading, data } = useQuery(GET_USERNAMES)

    function renderDropDownOptions(user) {
        return <option
            value={user.id}
            key={user.id}>
            {user.username}
        </option>
    }

    function handleSubmit(e) {
        e.preventDefault()

        createPost({
            variables: {
                post: {
                    title: title,
                    content: content,
                    authorID: authorID
                }
            }
        })
    }

    useEffect(() => {
        if (data) {
            setUsers(data.users)
        }
    }, [data])

    if (!users) {
        return <p>Loading...</p>
    }

    return <form onSubmit={handleSubmit}>
        <button id="publish-btn" type="submit">Publish</button>

        <select id="authors" onChange={(e) => setAuthorID(e.target.value)}>
            <option value="" disabled selected>Author</option>
            {users.map(renderDropDownOptions)}
        </select>

        <input
            id="title"
            type="text"
            required
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)} />
        <textarea
            id="content"
            type="text"
            required
            placeholder="Tell your story..."
            onChange={(e) => setContent(e.target.value)} />
    </form>
}
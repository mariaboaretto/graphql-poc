import "./PostDetailsForm.css"
import { CREATE_POST_MUTATION, EDIT_POST_MUTATION } from "../GraphQL/Mutations.js"
import { useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { GET_USERNAMES } from "../GraphQL/Queries.js"
import MsgModal from "../MsgModal/MsgModal.js"
import TextareaAutosize from 'react-textarea-autosize';

export default function PostDetailsForm(props) {
    const [title, setTitle] = useState(props.post ? props.post.title : null)
    const [content, setContent] = useState(props.post ? props.post.content : null)
    const [authorID, setAuthorID] = useState()
    const [users, setUsers] = useState()
    const [showModal, setShowModal] = useState(false)

    const [createPost, { error }] = useMutation(CREATE_POST_MUTATION)
    const [editPost, { editErr }] = useMutation(EDIT_POST_MUTATION)
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

        if (props.post) {
            editPost({
                variables: {
                    editPostId: props.post.id,
                    edits: {
                        title: title,
                        content: content
                    }
                }
            })
        } else {
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

        setShowModal(true)
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
        <select
            id="authors"
            onChange={(e) => setAuthorID(e.target.value)}
            required={props.post ? false : true}
            disabled={props.post ? true : false}>
            <option value="" disabled selected>
                {props.post ? props.post.author.f_name + " " + props.post.author.l_name : "Author"}
            </option>
            {users.map(renderDropDownOptions)}
        </select>

        <input
            id="title"
            type="text"
            defaultValue={props.post ? props.post.title : ""}
            required
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
        />

        <TextareaAutosize
            id="create-post-content-content"
            type="text"
            defaultValue={props.post ? props.post.content : ""}
            required
            placeholder="Write your post here"
            onChange={(e) => setContent(e.target.value)}
        />

        <button id="publish-btn" type="submit">Publish</button>

        {showModal ?
            <MsgModal
                title="Success!"
                content={props.post ? "Post updated successfully" : "Post created successfully!"}
                redirectLink={props.post ? `/post/${props.post.id}` : "/"}
            /> :
            null}
    </form>
}
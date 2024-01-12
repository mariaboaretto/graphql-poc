import { useMutation, useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { GET_COMMENTS_BY_POST, GET_USERNAMES } from "../GraphQL/Queries"
import { ADD_COMMENT_MUTATION } from "../GraphQL/Mutations"
import TextareaAutosize from 'react-textarea-autosize';
import { Link } from "react-router-dom";

export default function CreateCommentSection(props) {
    const [comment, setComment] = useState()
    const [users, setUsers] = useState()
    const [commentAuthor, setAuthor] = useState()

    // GraphQL queries and mutations
    const { userErr, _, data } = useQuery(GET_USERNAMES)
    const [addComment, { addCommentError }] = useMutation(ADD_COMMENT_MUTATION, {
        refetchQueries: [GET_COMMENTS_BY_POST, "GetComments"]
    })

    // Renders available users as dropdown menu options
    function renderDropDownOptions(user) {
        return <option
            value={user.id}
            key={user.id}>
            {user.username}
        </option>
    }

    // Handles form submission
    function handleSubmit() {
        addComment({
            variables: {
                comment: {
                    content: comment,
                    authorId: commentAuthor,
                    postId: props.postId
                }
            }
        })
    }

    // Sets users array
    useEffect(() => {
        if (data) {
            setUsers(data.users)
        }
    }, [data])

    // If users array hasn't been populated yet, render Loading...
    if (!users) {
        return <p>Loading...</p>
    }

    return <div id="create-comment-section">
        <form id="create-comment-form">
            <TextareaAutosize
                id="comment-input"
                placeholder="What are your thoughts?"
                onChange={(e) => setComment(e.target.value)}
                required
            />

            <div id="create-comment-footer">
                <select id="comment-author" onChange={(e) => setAuthor(e.target.value)} required>
                    <option value="" disabled selected>Author</option>
                    {users.map(renderDropDownOptions)}
                </select>

                <Link
                    to={`/post/${props.postId}`}
                    id="add-comment-btn" type="submit"
                    role="button" className="contrast"
                    onClick={handleSubmit}
                >
                    Post
                </Link>
            </div>
        </form>
    </div>
}
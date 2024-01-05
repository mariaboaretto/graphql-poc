import { useParams } from "react-router-dom";
import PostDetailsForm from "../../components/PostDetailsForm/PostDetailsForm";
import { useQuery } from "@apollo/client";
import { GET_POST_FOR_EDITING } from "../../components/GraphQL/Queries";
import { useEffect, useState } from "react";

export default function EditPostPage() {
    const postId = useParams().id
    const { postErr, _, data } = useQuery(GET_POST_FOR_EDITING, {
        variables: {
            postId: postId
        }
    })
    const [post, setPost] = useState()

    useEffect(() => {
        if (data) {
            setPost(data.post)
        }

    }, [data])

    if (!post) {
        return <div className="container">
            <article aria-busy="true"></article>
        </div>
    }

    return <div className="container">
        <h3>Edit Post</h3>
        <PostDetailsForm post={post} />
    </div>
}
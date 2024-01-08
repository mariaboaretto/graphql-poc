import { useQuery } from "@apollo/client"
import { useEffect, useState } from "react"
import { GET_POSTS } from "../GraphQL/Queries"
import PostCard from "../PostCard/PostCard"
import "./PostList.css"

export default function PostList() {
    const [posts, setPosts] = useState()
    const { postsError, _, data } = useQuery(GET_POSTS)

    // Renders a post card with post details
    function renderPosts(post) {
        // Parsing date string to correct format: Month DD, YYYY
        let parsedDate = new Date(post.postedOn).toDateString().split(" ")
        let date = parsedDate[1] + " " + parsedDate[2] + ", " + parsedDate[3]

        return <PostCard key={post.id}
            title={post.title}
            content={post.content}
            publicationDate={date}
            author={post.author}
            id={post.id}
        />
    }

    useEffect(() => {
        if (data) {
            console.log(data)
            setPosts(data.posts)
        }
    }, [data])

    if (!posts) {
        return <p>No data to display...</p>
    }

    return <div id="post-list">
        {posts.map(renderPosts)}
    </div>
}
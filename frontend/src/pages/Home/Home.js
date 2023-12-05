import PostCard from "../../components/PostCard/PostCard";
import PostList from "../../components/PostList/PostList";

export default function Home() {
    return <div className="container">
        <h3>All Posts</h3>
        <PostList />
    </div>
}
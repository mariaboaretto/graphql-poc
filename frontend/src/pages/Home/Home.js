import PostCard from "../../components/PostCard/PostCard";

export default function Home() {
    return <div className="container">
        <h3>All Posts</h3>
        <PostCard />
        <PostCard/>
    </div>
}
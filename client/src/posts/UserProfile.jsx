import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";

export default function UserProfile() {
  const { id } = useParams(); 
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchAuthorPosts = async () => {
      try {
        const res = await API.get("/posts", { params: { author: id } });
        setPosts(res.data.posts);

        
        if (res.data.posts.length > 0) {
          setAuthor(res.data.posts[0].author);
        }
      } catch (err) {
        console.error("Failed to fetch author posts", err);
      }
    };

    fetchAuthorPosts();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-10">
        
        {author ? (
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              {author.username}
            </h2>
            <p className="text-gray-600">{author.email}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500">Loading author...</p>
        )}

        
        <h3 className="text-2xl font-semibold mb-6 underline decoration-blue-500">
          Posts by {author?.username || "this author"}
        </h3>

        {posts.length === 0 ? (
          <p className="text-center text-gray-500">No posts from this author.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition duration-300"
            >
              <Link
                to={`/posts/${post._id}`}
                className="text-xl font-bold text-blue-700 hover:text-blue-900"
              >
                {post.title}
              </Link>

              
              <div className="mt-2">
                {post.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 mr-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <p className="text-gray-600 mt-3">
                {post.content.slice(0, 100)}...
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";
import debounce from "lodash.debounce";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");

  
  const fetchPosts = useCallback(
    debounce(async (query) => {
      try {
        const res = await API.get("/posts", {
          params: { search: query },
        });
        setPosts(res.data.posts);
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    }, 500),
    []
  );

  
  useEffect(() => {
    fetchPosts(search);
  }, [search, fetchPosts]);

  
  useEffect(() => {
    API.get("/posts")
      .then((res) => setPosts(res.data.posts))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800 underline decoration-blue-500 decoration-2">
          All Posts
        </h2>

        
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search posts by title, content, or tags..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {posts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No posts found. Try a different keyword!
          </p>
        )}

        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white border border-gray-200 rounded-xl shadow-md p-6 mb-6 hover:shadow-lg transition duration-300"
          >
            <Link
              to={`/posts/${post._id}`}
              className="text-2xl font-bold text-blue-700 hover:text-blue-900"
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

            
            <p className="text-gray-600 mt-3 mb-4">
              {post.content.slice(0, 150)}...
            </p>

            <div className="text-sm text-gray-500 italic">
              By:{" "}
              {post.author ? (
                <Link
                  to={`/user/${post.author._id}`}
                  className="text-blue-600 hover:underline"
                >
                  {post.author.username}
                </Link>
              ) : (
                "Unknown"
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

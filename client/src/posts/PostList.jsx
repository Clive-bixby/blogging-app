import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get('/posts')
      .then(res => setPosts(res.data.posts))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-4xl font-bold mb-8 text-center text-gray-800 underline decoration-blue-500 decoration-2">
          All Posts
        </h2>

        {posts.length === 0 && (
          <p className="text-center text-gray-500 mt-10">No posts yet. Be the first to create one!</p>
        )}

        {posts.map(post => (
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

            <p className="text-gray-600 mt-3 mb-4">
              {post.content.slice(0, 150)}...
            </p>

            <div className="text-sm text-gray-500 italic">
              By: {post.author?.username || 'Unknown'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

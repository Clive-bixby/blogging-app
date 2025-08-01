import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !token) return;

    API.get(`/posts?author=${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => setPosts(res.data.posts))
      .catch(err => console.error('Failed to fetch posts:', err));
  }, [user, token]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (!confirmDelete) return;

    try {
      await API.delete(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(prev => prev.filter(post => post._id !== id)); // Remove deleted post from UI
      alert('Post deleted successfully');
    } catch (err) {
      console.error('Failed to delete post:', err);
      alert('Delete failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">📚 My Posts</h2>

        {posts.length === 0 ? (
          <p className="text-center text-gray-600">You haven't created any posts yet.</p>
        ) : (
          posts.map(post => (
            <div
              key={post._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 mb-6 hover:shadow-md transition"
            >
              <Link to={`/posts/${post._id}`}>
                <h3 className="text-2xl font-semibold text-blue-700 hover:underline mb-3">
                  {post.title}
                </h3>
              </Link>

              <p className="text-gray-700 mb-4 whitespace-pre-line">
                {post.content.slice(0, 120)}...
              </p>

              <div className="flex gap-3">
                <Link
                  to={`/posts/${post._id}/edit`}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition"
                >
                  ✏️ Edit
                </Link>

                <button
                  onClick={() => handleDelete(post._id)}
                  className="inline-flex items-center gap-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

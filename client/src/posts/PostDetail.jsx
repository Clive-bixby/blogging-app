import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then(res => setPost(res.data.post))
      .catch(() => alert('Error loading post'));
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        const token = localStorage.getItem('accessToken');
        await API.delete(`/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert('Post deleted');
        navigate('/');
      } catch (err) {
        alert('Delete failed');
        console.error(err);
      }
    }
  };

  if (!post) return <p className="text-center mt-20 text-gray-600">Loading...</p>;

  const isAuthor = user?.id === post.author._id;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto px-4 py-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h2>
        <p className="text-gray-700 text-lg mb-6 whitespace-pre-line">{post.content}</p>
        <p className="text-sm text-gray-500 italic mb-8">
          By: {post.author.username}
        </p>

        {isAuthor && (
          <div className="flex gap-4">
            <Link
              to={`/posts/${post._id}/edit`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              ✏️ Edit
            </Link>
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
            >
              🗑 Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

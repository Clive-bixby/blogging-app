import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

export default function Drafts() {
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!user || !token) return;

    API.get('/posts', {
      params: { author: user._id, status: 'draft' }, // ✅ filter only user’s drafts
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        console.log("Fetched drafts:", res.data); // 👀 debug
        setDrafts(res.data.posts);
      })
      .catch((err) => {
        console.error('Failed to fetch drafts:', err);
      })
      .finally(() => setLoading(false));
  }, [user, token]);

  if (loading) {
    return <p className="text-center mt-20 text-gray-600">Loading drafts...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">📝 My Drafts</h2>

        {drafts.length === 0 ? (
          <p className="text-gray-600">No drafts yet.</p>
        ) : (
          <ul className="space-y-4">
            {drafts.map((draft) => (
              <li key={draft._id} className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-gray-800">
                  {draft.title}
                </h3>
                <p className="text-gray-600 mb-2">
                  {draft.content.substring(0, 100)}...
                </p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Last edited: {new Date(draft.updatedAt).toLocaleDateString()}</span>
                  <Link
                    to={`/posts/${draft._id}/edit`}
                    className="text-blue-600 hover:underline"
                  >
                    ✏️ Edit
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

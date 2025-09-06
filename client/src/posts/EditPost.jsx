import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function EditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', content: '', tags: '' });

  useEffect(() => {
    API.get(`/posts/${id}`)
      .then(res => {
        setForm({
          title: res.data.post.title,
          content: res.data.post.content,
          tags: res.data.post.tags.join(', '),
        });
      })
      .catch(() => alert('Failed to load post'));
  }, [id]);

  const handleUpdate = async (e) => {
  e.preventDefault();
  try {
    const updatedForm = {
      ...form,
      tags: form.tags.split(',').map(tag => tag.trim()),
    };

    await API.put(`/posts/${id}`, updatedForm);
    alert('Post updated!');
    navigate(`/posts/${id}`);
  } catch (err) {
    alert('Update failed');
  }
};

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">✏️ Edit Post</h2>

        <form onSubmit={handleUpdate} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="Enter title"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Tag</label>
            <input
              value={form.tags}
              onChange={e => setForm({ ...form, tags: e.target.value })}
              placeholder="Tags (comma-separated, e.g. political,productivity,node)"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Content</label>
            <textarea
              value={form.content}
              onChange={e => setForm({ ...form, content: e.target.value })}
              placeholder="Write your content here..."
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            ✅ Update Post
          </button>
        </form>
      </div>
    </div>
  );
}

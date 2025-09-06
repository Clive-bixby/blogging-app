import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [status, setStatus] = useState("draft");
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    const tags = tagInput.split(',').map(tag => tag.trim());
    try {
      await API.post('/posts', { title, content, tags, status });
      alert(status === "draft" ? "Post saved as draft!" : "Post published!");
      navigate('/');
    } catch (err) {
      alert('Failed to create post');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">📝 Create a New Post</h2>

        <form onSubmit={handleCreate} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-gray-700 font-medium mb-1">Tag</label>
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Tags (comma-separated, e.g. political,productivity,node)"
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post here..."
              rows={8}
              className="w-full px-4 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="draft">📝 Save as Draft</option>
              <option value="published">✅ Publish Now</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
          >
            {status === "draft" ? "💾 Save Draft" : "🚀 Publish Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

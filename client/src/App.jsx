import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Register from './auth/Register';
import PostList from './posts/PostList';
import CreatePost from './posts/CreatePost';
import PostDetail from './posts/PostDetail';
import EditPost from './posts/EditPost';
import MyPosts from './posts/MyPosts';
import Drafts from './posts/Drafts';
import ProtectedRoute from './components/ProtectedRoutes';
import Navbar from './components/Navbar';
import UserProfile from "./posts/UserProfile";
import NotFound from "./posts/NotFound";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/posts/:id/edit" element={
          <ProtectedRoute><EditPost /></ProtectedRoute>
      } />
        <Route path="/create" element={
        <ProtectedRoute><CreatePost /></ProtectedRoute>
      } />
      <Route
        path="/myposts"
       element={<ProtectedRoute><MyPosts /></ProtectedRoute>}
      />
      <Route path="/drafts" element={<Drafts />} />
      <Route path="/user/:id" element={<UserProfile />} />
      <Route path="*" element={<NotFound />} />
      </Routes>
      </div>
      </div>
      
    </Router>
  );
}

export default App;

import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Admin = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.role !== 'admin') {
      navigate('/');
      return;
    }

    fetchPosts();
    const interval = setInterval(fetchPosts, 10000);
    return () => clearInterval(interval);
  }, [user]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get('/api/posts');
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (postId, newStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`/api/posts/${postId}`, { status: newStatus }, config);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (postId) => {
    if (!window.confirm('Delete this complaint?')) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`/api/posts/${postId}`, config);
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center py-20">Loading admin dashboard...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">View and manage all complaints and posts in the app. Data refreshes every 10 seconds.</p>
        </div>
        <button
          onClick={() => { window.location.href = '/api/posts/export'; }}
          className="btn-primary whitespace-nowrap shadow-sm"
        >
          Download Complaints CSV
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-20 text-gray-500 bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border">
          No complaints or posts found.
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map(post => (
            <div key={post._id} className="card p-5 sm:p-6 border border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card shadow-sm">
              <div className="flex flex-col gap-3">
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
                      Category: <span className="font-medium">{post.category}</span>
                      {' • '}
                      Status: <span className="font-medium">{post.status}</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-300">
                    Author: {post.author?.email || post.author}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{post.description}</p>

                {post.location && (
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    Location: <span className="font-medium">{post.location}</span>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  {['Open', 'In Progress', 'Resolved', 'Closed'].map(statusOption => (
                    <button
                      key={statusOption}
                      onClick={() => handleStatusChange(post._id, statusOption)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition ${post.status === statusOption ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}`}
                    >
                      {statusOption}
                    </button>
                  ))}
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="px-3 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;

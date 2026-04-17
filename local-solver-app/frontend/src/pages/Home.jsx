import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { MapPin, MessageSquare, ArrowUp, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchPosts = async () => {
    try {
      const query = filter ? `?category=${filter}` : '';
      const res = await axios.get(`/api/posts${query}`);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchPosts();
  }, [filter]);

  const handleUpvote = async (postId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post(`/api/posts/${postId}/upvote`, {}, config);
      // Refresh posts
      fetchPosts();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading && posts.length === 0) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h1 className="text-3xl font-bold">Community Feed</h1>
        <Link to="/create-post" className="btn-primary whitespace-nowrap shadow-sm">Report Issue</Link>
      </div>

      <div className="flex gap-2 text-sm overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0" style={{ scrollbarWidth: 'none' }}>
        {['All', 'Lost & Found', 'Complaint', 'Event', 'Notice'].map(cat => (
          <button 
            key={cat} 
            onClick={() => setFilter(cat === 'All' ? '' : cat)}
            className={`px-4 py-1.5 rounded-full font-medium whitespace-nowrap transition cursor-pointer ${
              (filter === cat) || (filter === '' && cat === 'All') 
                ? 'bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-900 shadow-sm' 
                : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-dark-card dark:text-gray-400 dark:hover:bg-gray-800 border border-gray-200 dark:border-dark-border'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        {posts.length === 0 ? (
          <div className="text-center py-20 text-gray-500 bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border">
            No posts found in this category. Be the first to report an issue!
          </div>
        ) : (
          posts.map(post => (
            <div key={post._id} className="card p-5 sm:p-6 flex flex-col gap-4 transition hover:shadow-md border border-gray-100 dark:border-dark-border cursor-pointer" onClick={() => navigate(`/post/${post._id}`)}>
              <div>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-bold mb-1 hover:text-primary-600 transition">{post.title}</h3>
                    <div className="flex gap-2 text-xs font-semibold mt-2">
                      <span className="bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400 px-2.5 py-1 rounded-md">{post.category}</span>
                      <span className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-2.5 py-1 rounded-md">{post.status}</span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mt-3 leading-relaxed">{post.description}</p>
                {post.imageUrl && (
                  <div className="mt-4 rounded-lg overflow-hidden border border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-gray-900">
                    <img src={post.imageUrl} alt={post.title} className="w-full h-48 sm:h-64 object-cover" />
                  </div>
                )}
                {post.location && (
                  <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-4 font-medium">
                    <MapPin className="w-4 h-4 text-gray-400" /> {post.location}
                  </div>
                )}
              </div>
              <div className="flex gap-6 mt-2 border-t border-gray-100 dark:border-dark-border pt-4">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleUpvote(post._id); }}
                  className={`flex items-center gap-1.5 transition font-semibold text-sm sm:text-base ${
                    user && post.upvotes.includes(user._id) ? 'text-primary-600' : 'text-gray-500 hover:text-primary-600'
                  }`}
                >
                  <ArrowUp className="w-5 h-5" /> {post.upvotes.length}
                </button>
                <div className="flex items-center gap-1.5 text-gray-500 hover:text-primary-600 transition font-semibold text-sm sm:text-base">
                  <MessageSquare className="w-5 h-5" /> Discuss
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;

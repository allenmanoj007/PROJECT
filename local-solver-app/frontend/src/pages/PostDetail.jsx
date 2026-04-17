import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, ArrowUp, Loader2, ArrowLeft } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, commentsRes] = await Promise.all([
          axios.get('/api/posts'),
          axios.get(`/api/comments/${id}`)
        ]);
        const currentPost = postRes.data.find(p => p._id === id);
        setPost(currentPost);
        setComments(commentsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleUpvote = async () => {
    if (!user) return navigate('/login');
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const res = await axios.post(`/api/posts/${id}/upvote`, {}, config);
      setPost(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    if (!newComment.trim()) return;
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const res = await axios.post('/api/comments', { text: newComment, postId: id }, config);
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-primary-500" /></div>;
  if (!post) return <div className="text-center py-20 text-gray-500">Post not found.</div>;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-20">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 transition font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Feed
      </button>

      <div className="card p-6 md:p-8">
        <div className="flex gap-2 text-sm font-medium mb-4">
          <span className="bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-400 px-3 py-1 rounded-md">{post.category}</span>
          <span className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-3 py-1 rounded-md">{post.status}</span>
        </div>
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-lg leading-relaxed mb-6">{post.description}</p>
        
        {post.imageUrl && (
          <div className="mb-6 rounded-xl overflow-hidden border border-gray-100 dark:border-dark-border">
            <img src={post.imageUrl} alt={post.title} className="w-full object-contain max-h-[500px] bg-gray-50 dark:bg-gray-900" />
          </div>
        )}

        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-t border-gray-100 dark:border-dark-border pt-6 mt-6">
          {post.location && (
            <div className="flex items-center gap-1.5">
              <MapPin className="w-5 h-5" /> {post.location}
            </div>
          )}
          <button 
            onClick={handleUpvote}
            className={`flex items-center gap-1.5 transition font-medium text-base ${
              user && post.upvotes.includes(user._id) ? 'text-primary-600' : 'hover:text-primary-600'
            }`}
          >
            <ArrowUp className="w-6 h-6" /> {post.upvotes.length} Upvotes
          </button>
        </div>
      </div>

      <div className="card p-6 md:p-8">
        <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">Discussion ({comments.length})</h3>
        
        <form onSubmit={handleCommentSubmit} className="mb-8 flex gap-3">
          <input 
            type="text" 
            className="input-field flex-grow shadow-sm" 
            placeholder={user ? "Add a comment..." : "Log in to comment..."}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={!user}
          />
          <button type="submit" className="btn-primary whitespace-nowrap shadow-sm" disabled={!user}>Post</button>
        </form>

        <div className="space-y-6">
          {comments.map(comment => (
            <div key={comment._id} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 flex items-center justify-center font-bold flex-shrink-0">
                {comment.author?.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{comment.author?.email?.split('@')[0] || 'User'}</span>
                  <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{comment.text}</p>
              </div>
            </div>
          ))}
          {comments.length === 0 && <p className="text-gray-500 text-center py-4">No comments yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;

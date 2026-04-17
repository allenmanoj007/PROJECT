import { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LocationSelector from '../components/LocationSelector';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Notice');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to report an issue.");
      navigate('/login');
      return;
    }
    
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.post('/api/posts', {
        title, description, category, location, imageUrl
      }, config);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Failed to create post');
    }
  };

  return (
    <div className="max-w-2xl mx-auto card p-6 md:p-10 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Report an Issue / Post Update</h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Title</label>
          <input 
            type="text" 
            className="input-field" 
            placeholder="E.g., Pothole on Main Street"
            required 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Category</label>
          <select 
            className="input-field" 
            value={category} 
            onChange={e => setCategory(e.target.value)}
          >
            <option value="Lost & Found">Lost & Found</option>
            <option value="Complaint">Complaint</option>
            <option value="Event">Event</option>
            <option value="Notice">Notice</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Description</label>
          <textarea 
            className="input-field h-32 resize-none" 
            placeholder="Describe the issue in detail..."
            required 
            value={description} 
            onChange={e => setDescription(e.target.value)}
          ></textarea>
        </div>
        <div>
          <LocationSelector onLocationChange={setLocation} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Image URL (Optional)</label>
          <input 
             type="text" 
             className="input-field" 
             placeholder="https://example.com/image.jpg"
             value={imageUrl} 
             onChange={e => setImageUrl(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn-primary w-full py-3 mt-4 text-lg">Submit Post</button>
      </form>
    </div>
  );
};

export default CreatePost;

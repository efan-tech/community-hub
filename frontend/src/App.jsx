import React, { useState, useEffect } from 'react';
import API from './api';
import Dashboard from './pages/Dashboard';
import Feedback from './pages/Feedback';

// Initial Mock Data preserved so existing events never vanish
const INITIAL_MOCK_POSTS = [
  {
    id: 'mock-1',
    title: 'Quantum Code Hackathon 2026',
    category: 'Hackathons',
    date: 'Aug 20 - Aug 22',
    location: 'Science Complex • Lab 3',
    description: '48-hour build sprint! Team up to construct web apps, network tools, and AI engines.',
    club: 'Computer Science Guild',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    likes: 12,
    comments: [],
    isNew: false
  },
  {
    id: 'mock-2',
    title: 'Campus Cultural Fest & Food Bazaar',
    category: 'Cultural Festivals',
    date: 'Aug 25',
    location: 'Student Amphitheater',
    description: 'Live acoustic sets, global street food stalls, traditional fashion displays, and night performances.',
    club: 'Student Union',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
    likes: 24,
    comments: [],
    isNew: false
  },
  {
    id: 'mock-3',
    title: 'Coastal Summer Tide Retreat',
    category: 'Summer Tides',
    date: 'Sep 02 - Sep 04',
    location: 'South Coast Marine Bay',
    description: 'End-of-term weekend trip! Beach sports, campfire sessions, coastal exploration, and group transit.',
    club: 'Adventure & Outdoor Club',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    likes: 18,
    comments: [],
    isNew: false
  }
];

function App() {
  const [posts, setPosts] = useState(INITIAL_MOCK_POSTS);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);

  // Read logged-in user from localStorage or fallback to default
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ql_user');
    return saved ? JSON.parse(saved) : { username: 'Nahashon', handle: '@nahashon_tech', status: 'Active' };
  });

  useEffect(() => {
    API.get('/api/posts')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          // Merge API posts with initial mock posts so mock data is NEVER removed
          setPosts([...res.data, ...INITIAL_MOCK_POSTS]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching posts, using mock data baseline:', err);
        setLoading(false);
      });
  }, []);

  // Handler to append newly created posts to state with a subtle highlight flag
  const handleAddPost = (newPost) => {
    const postWithGlow = {
      ...newPost,
      id: Date.now().toString(),
      likes: 0,
      comments: [],
      isNew: true // Used for the subtle "attractive goo/glow" effect
    };
    setPosts([postWithGlow, ...posts]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050b14] flex items-center justify-center text-sky-400 font-semibold">
        Loading Community Hub...
      </div>
    );
  }

  if (showFeedback) {
    return (
      <div className="min-h-screen bg-[#050b14] text-gray-100 p-4 max-w-md mx-auto">
        <button
          onClick={() => setShowFeedback(false)}
          className="mb-4 text-sky-400 text-sm font-semibold hover:underline"
        >
          ← Back to Campus Feed
        </button>
        <Feedback />
      </div>
    );
  }

  return (
    <Dashboard 
      posts={posts} 
      onAddPost={handleAddPost} 
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      setShowFeedback={setShowFeedback}
    />
  );
}

export default App;

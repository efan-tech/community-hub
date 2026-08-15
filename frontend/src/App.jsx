import React, { useState, useEffect } from 'react';
import API from './api';
import Dashboard from './pages/Dashboard';
import Feedback from './pages/Feedback';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    API.get('/api/posts')
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching posts:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050b14] flex items-center justify-center text-sky-400 font-bold">
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
    <div className="relative">
      <Dashboard posts={posts} />
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowFeedback(true)}
          className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-full shadow-lg transition-all"
        >
          💬 Feedback
        </button>
      </div>
    </div>
  );
}

export default App;

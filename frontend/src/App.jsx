import React, { useState, useEffect } from 'react';
import { fetchPosts } from './api';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then((data) => {
      setPosts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <p className="animate-pulse text-lg">Loading feed...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 p-4 max-w-md mx-auto">
      {/* Header */}
      <header className="mb-6 border-b border-gray-800 pb-4">
        <h1 className="text-2xl font-bold tracking-tight text-white">Campus Feed</h1>
      </header>

      {/* Feed Cards */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="bg-gray-900 border border-gray-800 rounded-xl p-4 shadow-lg">
            {/* Author Info */}
            <div className="flex items-center space-x-3 mb-3">
              {post.author?.avatar && (
                <img src={post.author.avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
              )}
              <div>
                <p className="font-semibold text-sm text-white">{post.author?.name || 'Anonymous'}</p>
                <p className="text-xs text-gray-400">{post.author?.handle}</p>
              </div>
            </div>

            {/* Post Media / Title */}
            {post.image && (
              <img src={post.image} alt={post.title} className="w-full h-44 object-cover rounded-lg mb-3" />
            )}
            <h2 className="text-base font-bold text-white mb-1">{post.title}</h2>
            <p className="text-xs text-indigo-400 mb-2">{post.location} • {post.date}</p>
            <p className="text-xs text-gray-300 leading-relaxed mb-3">{post.description}</p>

            {/* Reactions / Stats */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-800 text-xs text-gray-400">
              <span>{post.joinedCount || 0} Joined</span>
              <span>💬 {post.comments?.length || 0} Comments</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

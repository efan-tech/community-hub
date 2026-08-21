import React, { useState } from 'react';

// Community Members Active/Inactive Data
const INITIAL_MEMBERS = [
  { id: 1, name: 'Nahashon', handle: '@nahashon_tech', status: 'Active', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80' },
  { id: 2, name: 'Drex', handle: '@drex_dev', status: 'Active', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80' },
  { id: 3, name: 'Mercy', handle: '@mercy_art', status: 'Offline', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80' },
  { id: 4, name: 'Yvonne', handle: '@yvonne_c', status: 'Active', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80' },
  { id: 5, name: 'Joel', handle: '@joel_m', status: 'Offline', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80' }
];

const Dashboard = ({ posts = [], onAddPost, currentUser = {}, setShowFeedback }) => {
  const [form, setForm] = useState({
    title: '',
    category: 'Hackathons',
    venue: '',
    date: '',
    image: '',
    description: ''
  });

  const [likeCounts, setLikeCounts] = useState({});
  const [commentsState, setCommentsState] = useState({});
  const [commentInputs, setCommentInputs] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    onAddPost({
      ...form,
      club: currentUser.username || 'Nahashon',
      image: form.image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
    });

    setForm({ title: '', category: 'Hackathons', venue: '', date: '', image: '', description: '' });
  };

  const handleLike = (id, baseLikes = 0) => {
    setLikeCounts(prev => ({
      ...prev,
      [id]: (prev[id] ?? baseLikes) + 1
    }));
  };

  const handleAddComment = (id) => {
    const text = commentInputs[id];
    if (!text || !text.trim()) return;

    setCommentsState(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), { user: currentUser.username || 'Nahashon', text }]
    }));
    setCommentInputs(prev => ({ ...prev, [id]: '' }));
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-gray-100 p-4 max-w-md mx-auto space-y-6 pb-12">
      {/* Top Navbar Header */}
      <header className="flex items-center justify-between py-2 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse"></span>
          <span className="font-bold tracking-wider text-sm uppercase text-gray-100">Quantum Logic</span>
        </div>
        <button 
          onClick={() => setShowFeedback(true)}
          className="text-xs bg-red-950/40 text-red-400 border border-red-800/50 px-3 py-1.5 rounded-md font-medium hover:bg-red-900/30 transition"
        >
          Terminate Session
        </button>
      </header>

      {/* Logged in User Profile Info */}
      <div className="bg-[#0b1329] border border-slate-800 p-3 rounded-xl flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"} 
            alt="User Avatar" 
            className="w-10 h-10 rounded-full border border-sky-400/50 object-cover" 
          />
          <div>
            <h3 className="font-semibold text-sm text-white">{currentUser.username || 'Nahashon'}</h3>
            <p className="text-xs text-sky-400">{currentUser.handle || '@nahashon_tech'}</p>
          </div>
        </div>
        <span className="flex items-center text-xs text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-full border border-emerald-800/40 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
          Active
        </span>
      </div>

      {/* Online / Offline Community Status Tracker */}
      <section className="space-y-2">
        <h4 className="text-xs uppercase font-bold text-slate-400 tracking-wider">Community Status</h4>
        <div className="flex space-x-3 overflow-x-auto py-1 scrollbar-none">
          {INITIAL_MEMBERS.map((member) => (
            <div key={member.id} className="flex-shrink-0 flex items-center space-x-2 bg-[#08101e] border border-slate-800/80 px-2.5 py-1.5 rounded-lg">
              <div className="relative">
                <img src={member.avatar} alt={member.name} className="w-6 h-6 rounded-full object-cover" />
                <span className={`absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full border border-slate-900 ${member.status === 'Active' ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
              </div>
              <span className="text-xs text-slate-300 font-medium">{member.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Sleek Compact Post an Activity Form */}
      <section className="bg-[#0b1329] border border-slate-800 p-4 rounded-xl space-y-3">
        <div className="flex items-center space-x-2">
          <img 
            src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"} 
            alt="User" 
            className="w-6 h-6 rounded-full object-cover" 
          />
          <h3 className="font-bold text-sm text-white">Post an Activity</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5">
          <input 
            type="text" 
            placeholder="What's happening? (e.g., Code sprint, Beach trip)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-[#050b14] border border-slate-700/70 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            required
          />

          <div className="grid grid-cols-2 gap-2">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-[#050b14] border border-slate-700/70 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              <option value="Hackathons">Hackathons</option>
              <option value="Art & Craft">Art & Craft</option>
              <option value="Cultural Festivals">Cultural Festivals</option>
              <option value="Summer Tides">Summer Tides</option>
            </select>
            <input 
              type="text"
              placeholder="Venue / Spot"
              value={form.venue}
              onChange={(e) => setForm({ ...form, venue: e.target.value })}
              className="bg-[#050b14] border border-slate-700/70 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <input 
              type="text"
              placeholder="Date / Schedule"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="bg-[#050b14] border border-slate-700/70 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
            <input 
              type="text"
              placeholder="Image URL (Optional)"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="bg-[#050b14] border border-slate-700/70 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <textarea 
            rows="2"
            placeholder="Tell Nahashon, Drex, Mercy, Yvonne, and Joel what to expect..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-[#050b14] border border-slate-700/70 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 resize-none"
          ></textarea>

          <button 
            type="submit"
            className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-2 rounded-lg text-xs transition flex items-center justify-center space-x-1"
          >
            <span>🚀 Publish Event</span>
          </button>
        </form>
      </section>

      {/* Community Feed Container */}
      <section className="space-y-4">
        <h3 className="font-bold text-sm text-white tracking-wide">Campus Community Feed</h3>

        {posts.map((post) => {
          const likes = likeCounts[post.id] ?? post.likes ?? 0;
          const comments = commentsState[post.id] || post.comments || [];

          return (
            <div 
              key={post.id} 
              className={`bg-[#0b1329] rounded-xl overflow-hidden border transition-all duration-300 ${
                post.isNew 
                  ? 'border-sky-500/40 shadow-[0_0_12px_rgba(56,189,248,0.2)]' 
                  : 'border-slate-800/90 hover:border-slate-700'
              }`}
            >
              {/* Scaled Compact Image Banner */}
              <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover" 
                />
                <span className="absolute top-2.5 right-2.5 bg-slate-950/80 backdrop-blur-md text-sky-400 text-[10px] font-semibold px-2.5 py-1 rounded-md border border-slate-700/60">
                  {post.category}
                </span>
                {post.isNew && (
                  <span className="absolute top-2.5 left-2.5 bg-sky-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded shadow">
                    NEW POST
                  </span>
                )}
              </div>

              {/* Card Body */}
              <div className="p-3.5 space-y-2.5">
                <div className="flex items-center text-[11px] text-sky-400 space-x-3">
                  <span>📅 {post.date || 'Upcoming'}</span>
                  <span>📍 {post.location || post.venue || 'Campus'}</span>
                </div>

                <h4 className="font-bold text-sm text-white leading-snug">{post.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{post.description}</p>

                {/* Footer Actions */}
                <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                  <span className="text-slate-400 font-medium text-[11px]">
                    {post.author?.name || post.club || 'Student Union'}
                  </span>
                  
                  {/* Interactive Like Button */}
                  <button 
                    onClick={() => handleLike(post.id, post.likes || 0)}
                    className="flex items-center space-x-1.5 bg-sky-950/60 hover:bg-sky-900/60 text-sky-400 border border-sky-800/50 px-3 py-1 rounded-lg text-xs transition"
                  >
                    <span>❤️</span>
                    <span className="font-semibold">{likes}</span>
                  </button>
                </div>

                {/* Inline Comment System */}
                <div className="mt-3 pt-2 border-t border-slate-800/60 space-y-2">
                  {comments.length > 0 && (
                    <div className="space-y-1 bg-[#050b14]/60 p-2 rounded-lg">
                      {comments.map((c, idx) => (
                        <p key={idx} className="text-[11px] text-slate-300">
                          <strong className="text-sky-400">{c.user}: </strong>{c.text}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="flex space-x-2 pt-1">
                    <input 
                      type="text" 
                      placeholder="Add a comment..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                      className="flex-1 bg-[#050b14] border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                    />
                    <button 
                      onClick={() => handleAddComment(post.id)}
                      className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold px-3 py-1 rounded-lg text-[11px] transition"
                    >
                      Post
                    </button>
                  </div>
                </div>

              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';

const CATEGORY_DATA = [
  { id: 'All', name: 'All Events', tag: 'Live', image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=600&q=80' },
  { id: 'Hackathons', name: 'Hackathons', tag: 'Code & Build', image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80' },
  { id: 'Art & Craft', name: 'Art & Craft', tag: 'Exhibitions', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80' },
  { id: 'Cultural Festivals', name: 'Cultural Fests', tag: 'Music & Food', image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=600&q=80' },
  { id: 'Summer Tides', name: 'Summer Tides', tag: 'Beach Trips', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
  { id: 'Travel & Tours', name: 'Travel & Tours', tag: 'Expeditions', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&q=80' }
];

const FEATURED_HIGHLIGHTS = [
  { title: '🔥 Campus Hackathon 2026', sub: '48-Hour Sprint • Win Prizes & Badges', img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1000&q=80' },
  { title: '🌊 Coastal Summer Tide Trip', sub: 'Beach Camping & Volleyball • Sept 02', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80' },
  { title: '🎨 Arts & Craft Night', sub: 'Live Exhibition & Student Gallery', img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1000&q=80' }
];

const Dashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [heroIndex, setHeroIndex] = useState(0);
  const [posts, setPosts] = useState([]);

  // Auto carousel slide timer
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex((prev) => (prev + 1) % FEATURED_HIGHLIGHTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  // Live MongoDB Fetching
  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.error('Error fetching posts:', err));
  }, []);

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 font-sans max-w-md mx-auto pb-10">
      
      {/* Quantum Logic Top Bar */}
      <div className="flex justify-between items-center bg-[#09101f] px-4 py-3 border-b border-slate-800/80 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]"></span>
          <span className="text-xs font-black tracking-widest text-white uppercase">Quantum Logic</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-300">Dashboard</span>
          <button className="bg-red-950/40 text-red-400 border border-red-900/60 text-[11px] font-bold px-2.5 py-1 rounded-md hover:bg-red-900/40 transition-colors">
            Terminate Session
          </button>
        </div>
      </div>

      <div className="px-3.5 space-y-5">
        
        {/* Featured Highlight Hero Box */}
        <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
          <img src={FEATURED_HIGHLIGHTS[heroIndex].img} alt="Hero" className="w-full h-full object-cover" />
          
          {/* Top Pagination Dots */}
          <div className="absolute top-3 right-3 flex gap-1.5 z-10">
            {FEATURED_HIGHLIGHTS.map((_, i) => (
              <span
                key={i}
                onClick={() => setHeroIndex(i)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${
                  heroIndex === i ? 'bg-sky-400 shadow-[0_0_6px_#38bdf8]' : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/50 to-transparent p-4 flex flex-col justify-end text-center">
            <span className="text-[10px] font-bold text-sky-400 tracking-wider uppercase mb-0.5">Featured Highlight</span>
            <h2 className="text-lg font-extrabold text-white tracking-tight">{FEATURED_HIGHLIGHTS[heroIndex].title}</h2>
            <p className="text-xs text-slate-300 mt-0.5">{FEATURED_HIGHLIGHTS[heroIndex].sub}</p>
          </div>
        </div>

        {/* Categories Section */}
        <div>
          <div className="flex justify-between items-center mb-2.5 px-0.5">
            <h3 className="text-sm font-extrabold text-white">Categories</h3>
            <span className="text-[11px] text-slate-400 font-medium">Swipe 👈 👉</span>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2 snap-x no-scrollbar">
            {CATEGORY_DATA.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex-none w-32 h-24 rounded-2xl overflow-hidden relative snap-start cursor-pointer border-2 transition-all ${
                    isActive
                      ? 'border-sky-400 shadow-[0_0_12px_rgba(56,189,248,0.35)] scale-[1.02]'
                      : 'border-slate-800/80 opacity-80 hover:opacity-100'
                  }`}
                >
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050b14] via-[#050b14]/40 to-transparent p-2 flex flex-col justify-end text-center">
                    <span className="text-[9px] text-sky-400 font-bold">{cat.tag}</span>
                    <h4 className="text-xs text-white font-extrabold leading-tight mt-0.5">{cat.name}</h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Events Feed Header */}
        <div>
          <div className="flex justify-between items-center mb-3 px-0.5">
            <h3 className="text-sm font-extrabold text-white">
              {selectedCategory === 'All' ? 'All Campus Events' : selectedCategory}
            </h3>
            <span className="text-[11px] text-sky-400 bg-sky-950/80 border border-sky-800/60 px-2.5 py-0.5 rounded-md font-semibold">
              {filteredPosts.length} Items
            </span>
          </div>

          {/* Event Cards */}
          <div className="space-y-4">
            {filteredPosts.map((post) => {
              const pId = post.id || post._id;
              return (
                <div key={pId} className="bg-[#0a1120] border border-slate-800/90 rounded-2xl overflow-hidden shadow-lg">
                  
                  {/* Image Container with Floating Badge */}
                  <div className="relative h-40 w-full bg-slate-950">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    <span className="absolute top-3 right-3 bg-[#071328]/90 border border-sky-800/60 text-sky-400 text-[10px] font-bold px-2.5 py-1 rounded-lg backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-4">
                    <div className="flex justify-between items-center text-[11px] text-sky-400 font-medium mb-2">
                      <span className="flex items-center gap-1">📅 {post.date}</span>
                      <span className="flex items-center gap-1 text-sky-300">📍 {post.location}</span>
                    </div>

                    <h3 className="text-base font-bold text-white text-center mb-1.5">{post.title}</h3>
                    <p className="text-xs text-slate-400 text-center leading-relaxed mb-4">{post.description}</p>

                    {/* Footer Actions */}
                    <div className="flex justify-between items-center pt-3 border-t border-slate-800/80 text-xs">
                      <span className="text-slate-500 font-medium text-[11px]">
                        {post.author?.name || 'Student Union'}
                      </span>
                      <button className="bg-sky-950/80 text-sky-400 border border-sky-800/60 hover:bg-sky-900/60 px-3.5 py-1 rounded-lg text-[11px] font-bold transition-colors">
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar Header */}
        <div className="pt-2 text-center">
          <button className="w-full bg-[#0d172a] hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl border border-slate-800 text-xs shadow-md transition-all">
            Publish Event
          </button>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;

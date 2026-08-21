import React, { useState } from 'react';

const INITIAL_MEMBERS = [
  { id: 1, name: 'Nahashon', handle: '@nahashon_tech', status: 'Active', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80' },
  { id: 2, name: 'Drex', handle: '@drex_dev', status: 'Active', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=120&q=80' },
  { id: 3, name: 'Mercy', handle: '@mercy_art', status: 'Offline', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80' },
  { id: 4, name: 'Yvonne', handle: '@yvonne_c', status: 'Active', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80' },
  { id: 5, name: 'Joel', handle: '@joel_m', status: 'Offline', avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=120&q=80' }
];

const categoryColors = {
  'Arts': 'bg-purple-600/90 text-purple-100',
  'Praise & Worship': 'bg-rose-600/90 text-rose-100',
  'Tech & Innovation': 'bg-sky-600/90 text-sky-100',
  'Sports': 'bg-emerald-600/90 text-emerald-100',
  'Hackathons': 'bg-indigo-600/90 text-indigo-100',
  'Cultural': 'bg-pink-600/90 text-pink-100',
  'General': 'bg-slate-600/90 text-slate-100'
};

const Dashboard = ({
  events = [],
  onAddEvent,
  onRsvp,
  currentUser = {},
  setShowFeedback
}) => {
  const [form, setForm] = useState({
    title: '',
    category: 'General',
    location: '',
    date: '',
    image: '',
    description: ''
  });

  // Simple ripple effect
  const createRipple = (event) => {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');

    const existing = button.getElementsByClassName('ripple')[0];
    if (existing) existing.remove();

    button.appendChild(circle);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) return;

    onAddEvent({
      title: form.title,
      category: form.category,
      location: form.location || 'Campus',
      date: form.date || 'TBA',
      image: form.image || 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      description: form.description
    });

    setForm({
      title: '',
      category: 'General',
      location: '',
      date: '',
      image: '',
      description: ''
    });
  };

  const getUserRsvp = (event) => {
    if (!event.rsvps) return null;
    return event.rsvps.find(r => r.name === (currentUser.username || 'Nahashon'));
  };

  return (
    <div className="min-h-screen bg-[#050b14] text-gray-100 px-4 pt-4 pb-16 max-w-md mx-auto space-y-5">
      
      {/* Header */}
      <header className="flex items-center justify-between py-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse"></span>
          <span className="font-bold tracking-wide text-sm uppercase text-white">
            Community Hub
          </span>
        </div>
        <button
          onClick={() => setShowFeedback(true)}
          className="text-xs bg-slate-800 active:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-2 rounded-lg font-medium transition"
        >
          Feedback
        </button>
      </header>

      {/* Current User */}
      <div className="bg-[#0b1329] border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <img
            src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80"}
            alt="You"
            className="w-11 h-11 rounded-full border-2 border-sky-500/60 object-cover"
          />
          <div>
            <h3 className="font-semibold text-sm text-white leading-tight">
              {currentUser.username || 'Nahashon'}
            </h3>
            <p className="text-xs text-sky-400 mt-0.5">
              {currentUser.handle || '@nahashon_tech'}
            </p>
          </div>
        </div>
        <span className="flex items-center text-[11px] text-emerald-400 bg-emerald-950/60 px-2.5 py-1.5 rounded-full border border-emerald-800/50 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-1.5"></span>
          Active
        </span>
      </div>

      {/* Community Members */}
      <section>
        <h4 className="text-[11px] uppercase font-bold text-slate-500 tracking-wider mb-2.5 px-0.5">
          Community
        </h4>
        <div className="flex gap-4 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-none">
          {INITIAL_MEMBERS.map((member) => (
            <div key={member.id} className="flex-shrink-0 flex flex-col items-center gap-1.5 w-14">
              <div className="relative">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-slate-700"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#050b14] ${
                    member.status === 'Active' ? 'bg-emerald-400' : 'bg-slate-500'
                  }`}
                ></span>
              </div>
              <span className="text-[10px] text-slate-400 font-medium truncate w-full text-center">
                {member.name}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Create Invite Form */}
      <section className="bg-[#0b1329] border border-slate-800 p-4 rounded-2xl space-y-3.5 shadow-lg">
        <h3 className="font-bold text-sm text-white flex items-center gap-2">
          <span className="text-sky-400">✦</span> Invite people to an event
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Event title (e.g. Sunday Mass, Art Jam)"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full bg-[#050b14] border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            required
          />

          <div className="grid grid-cols-2 gap-2.5">
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="bg-[#050b14] border border-slate-700 rounded-xl px-3 py-3 text-sm text-white focus:outline-none focus:border-sky-500"
            >
              <option value="General">General</option>
              <option value="Arts">Arts</option>
              <option value="Praise & Worship">Praise & Worship</option>
              <option value="Tech & Innovation">Tech & Innovation</option>
              <option value="Sports">Sports</option>
              <option value="Hackathons">Hackathons</option>
              <option value="Cultural">Cultural</option>
            </select>

            <input
              type="text"
              placeholder="Location"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="bg-[#050b14] border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <input
              type="text"
              placeholder="Date / Time"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="bg-[#050b14] border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
            <input
              type="text"
              placeholder="Image URL (optional)"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="bg-[#050b14] border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>

          <textarea
            rows="3"
            placeholder="Tell people what to expect..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-[#050b14] border border-slate-700 rounded-xl p-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 resize-none"
            required
          ></textarea>

          <button
            type="submit"
            onClick={createRipple}
            className="relative overflow-hidden w-full bg-sky-500 active:bg-sky-400 text-slate-950 font-bold py-3.5 rounded-xl text-sm transition"
          >
            Send Invite
          </button>
        </form>
      </section>

      {/* Events Feed */}
      <section className="space-y-4">
        <h3 className="font-bold text-sm text-white tracking-wide px-0.5">
          Community Event Invites
        </h3>

        {events.length === 0 && (
          <div className="text-center py-14 px-4">
            <div className="text-4xl mb-3">📅</div>
            <p className="text-slate-400 text-sm leading-relaxed">
              No events yet.<br />Be the first to invite the community!
            </p>
          </div>
        )}

        {events.map((event) => {
          const userRsvp = getUserRsvp(event);
          const goingPeople = event.rsvps?.filter(r => r.status === 'going') || [];
          const maybeCount = event.rsvps?.filter(r => r.status === 'maybe').length || 0;

          return (
            <div
              key={event._id}
              className="bg-[#0b1329] rounded-2xl overflow-hidden border border-slate-800 shadow-lg"
            >
              {event.image && (
                <div className="relative h-48 w-full bg-slate-900">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <span className={`absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-lg backdrop-blur-md ${categoryColors[event.category] || categoryColors['General']}`}>
                    {event.category}
                  </span>
                </div>
              )}

              <div className="p-4 space-y-3">
                <div className="flex items-center gap-3 text-xs text-sky-400/90">
                  <span>📅 {event.date || 'TBA'}</span>
                  <span>📍 {event.location || 'Campus'}</span>
                </div>

                <div>
                  <h4 className="font-bold text-base text-white leading-snug">
                    {event.title}
                  </h4>
                  <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="text-xs text-slate-500">
                  Hosted by <span className="text-slate-300">{event.author?.name || 'Community'}</span>
                </div>

                {/* Going avatars + count */}
                <div className="flex items-center gap-2.5">
                  {goingPeople.length > 0 && (
                    <div className="flex -space-x-2">
                      {goingPeople.slice(0, 4).map((person, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full bg-slate-700 border-2 border-[#0b1329] flex items-center justify-center text-[10px] font-bold text-white"
                        >
                          {person.name.charAt(0).toUpperCase()}
                        </div>
                      ))}
                    </div>
                  )}
                  <span className="text-xs text-emerald-400 font-medium">
                    {event.joinedCount || 0} going
                    {maybeCount > 0 && (
                      <span className="text-slate-500 ml-1.5">· {maybeCount} maybe</span>
                    )}
                  </span>
                </div>

                {/* RSVP Buttons with ripple */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  <button
                    onClick={(e) => {
                      createRipple(e);
                      onRsvp(event._id, 'going');
                    }}
                    className={`relative overflow-hidden py-3 rounded-xl text-xs font-bold transition ${
                      userRsvp?.status === 'going'
                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-900/30'
                        : 'bg-emerald-950/70 text-emerald-300 border border-emerald-800/60 active:bg-emerald-800'
                    }`}
                  >
                    I’m Going
                  </button>

                  <button
                    onClick={(e) => {
                      createRipple(e);
                      onRsvp(event._id, 'maybe');
                    }}
                    className={`relative overflow-hidden py-3 rounded-xl text-xs font-bold transition ${
                      userRsvp?.status === 'maybe'
                        ? 'bg-amber-500 text-white shadow-lg shadow-amber-900/30'
                        : 'bg-amber-950/70 text-amber-300 border border-amber-800/60 active:bg-amber-800'
                    }`}
                  >
                    Maybe
                  </button>

                  <button
                    onClick={(e) => {
                      createRipple(e);
                      onRsvp(event._id, 'not-going');
                    }}
                    className={`relative overflow-hidden py-3 rounded-xl text-xs font-bold transition ${
                      userRsvp?.status === 'not-going'
                        ? 'bg-slate-500 text-white'
                        : 'bg-slate-800/80 text-slate-300 border border-slate-700 active:bg-slate-700'
                    }`}
                  >
                    Can’t Go
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* Ripple CSS */}
      <style>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          background-color: rgba(255, 255, 255, 0.35);
          pointer-events: none;
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;

import React, { useState, useEffect } from 'react';
import API from './api';
import Dashboard from './pages/Dashboard';
import Feedback from './pages/Feedback';

function App() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);

  // Current logged-in user (simple version for now)
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('ql_user');
    return saved
      ? JSON.parse(saved)
      : { username: 'Nahashon', handle: '@nahashon_tech', status: 'Active' };
  });

  // Fetch all events from the backend
  const loadEvents = async () => {
    try {
      const res = await API.get('/events');
      setEvents(res.data || []);
    } catch (err) {
      console.error('Error fetching events:', err);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // When a new event is created
  const handleAddEvent = async (newEventData) => {
    try {
      const res = await API.post('/events', {
        ...newEventData,
        author: {
          name: currentUser.username || 'Anonymous',
          handle: currentUser.handle || '',
          avatar: currentUser.avatar || ''
        }
      });

      // Add the new event to the top of the list
      setEvents([res.data, ...events]);
    } catch (err) {
      console.error('Error creating event:', err);
      alert('Failed to create event. Please try again.');
    }
  };

  // When someone RSVPs
  const handleRsvp = async (eventId, status) => {
    try {
      const res = await API.post(`/events/${eventId}/rsvp`, {
        name: currentUser.username || 'Anonymous',
        status: status   // 'going' | 'maybe' | 'not-going'
      });

      // Update the event in the list
      setEvents(prev =>
        prev.map(ev => (ev._id === eventId ? res.data : ev))
      );
    } catch (err) {
      console.error('RSVP error:', err);
      alert('Failed to RSVP. Please try again.');
    }
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
      events={events}
      onAddEvent={handleAddEvent}
      onRsvp={handleRsvp}
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      setShowFeedback={setShowFeedback}
    />
  );
}

export default App;

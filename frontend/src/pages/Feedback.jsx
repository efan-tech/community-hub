import React, { useState } from 'react';
import API from '../api';

const Feedback = () => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/api/feedback', { subject, message });
      setStatus('Feedback submitted successfully!');
      setSubject('');
      setMessage('');
    } catch (err) {
      console.error(err);
      setStatus('Failed to submit feedback.');
    }
  };

  return (
    <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Submit Feedback</h2>
      {status && <p className="mb-4 text-sky-400 text-sm">{status}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Subject
          </label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Feedback subject..."
            className="w-full bg-[#07101f] border border-slate-700 rounded-xl px-3 py-2 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Your Contribution
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Share your idea or feedback..."
            rows="5"
            className="w-full bg-[#07101f] border border-slate-700 rounded-xl px-3 py-2 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-2.5 rounded-xl transition-all"
        >
          Submit Contribution
        </button>
      </form>
    </div>
  );
};

export default Feedback;

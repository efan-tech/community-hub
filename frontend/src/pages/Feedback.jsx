import React, { useState } from 'react';

const Feedback = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Feedback');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim() || !message.trim()) {
      return;
    }

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name.trim() || !message.trim()) {
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        type,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to submit feedback');
    }

    setSubmitted(true);
    setName('');
    setMessage('');
    setType('Feedback');
  } catch (error) {
    console.error('Error submitting feedback:', error);
  }
};

  return (
    <div className="min-h-screen bg-[#050b14] text-slate-100 font-sans max-w-md mx-auto px-4 py-6">

      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-white">
          💡 Feedback & Ideas
        </h1>

        <p className="text-sm text-slate-400 mt-2">
          Share your ideas, suggestions, or feedback and help us improve
          the Community Hub.
        </p>
      </div>

      {submitted && (
        <div className="mb-5 bg-green-950/40 border border-green-800 text-green-400 rounded-xl p-3 text-sm">
          ✅ Thank you for contributing! Your feedback has been received.
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-[#0a1120] border border-slate-800 rounded-2xl p-5 space-y-5"
      >

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Your Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full bg-[#07101f] border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-sky-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">
            Contribution Type
          </label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full bg-[#07101f] border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-sky-400"
          >
            <option>Feedback</option>
            <option>Idea</option>
            <option>Suggestion</option>
          </select>
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
            className="w-full bg-[#07101f] border border-slate-700 rounded-xl px-3 py-2.5 text-sm text-white outline-none resize-none focus:border-sky-400"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-3 rounded-xl transition-colors"
        >
          Submit Contribution
        </button>

      </form>
    </div>
  );
};

export default Feedback;
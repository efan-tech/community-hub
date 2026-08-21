import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',   // change later for production
});

export default API;

// Helper functions
export const fetchEvents = () => API.get('/events');
export const createEvent = (eventData) => API.post('/events', eventData);
export const rsvpToEvent = (eventId, data) => API.post(`/events/${eventId}/rsvp`, data);

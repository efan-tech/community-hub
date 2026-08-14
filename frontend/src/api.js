// src/api.js
const API_BASE_URL = 'http://localhost:5000/api';

export const fetchPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const createPost = async (postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating post:', error);
  }
};
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Points to your Express backend
});

export default API;

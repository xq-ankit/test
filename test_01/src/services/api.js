import axios from 'axios';

const BASE_URL = '/evaluation-service';

const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0OTU4NzAwLCJpYXQiOjE3NDQ5NTg0MDAsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjA5OGU1ZWU2LTAzNDQtNDE2Zi05ODA2LWMwNDBhZjkxMWUwOCIsInN1YiI6ImFua2l0Lmd1cHRhX2NzMjJAZ2xhLmFjLmluIn0sImVtYWlsIjoiYW5raXQuZ3VwdGFfY3MyMkBnbGEuYWMuaW4iLCJuYW1lIjoiYW5raXQga3VtYXIgZ3VwdGEiLCJyb2xsTm8iOiI2Mjk1NzE0NzAzIiwiYWNjZXNzQ29kZSI6IkNObmVHVCIsImNsaWVudElEIjoiMDk4ZTVlZTYtMDM0NC00MTZmLTk4MDYtYzA0MGFmOTExZTA4IiwiY2xpZW50U2VjcmV0IjoiVXZ4dHhUd0pYcmdjalBOaiJ9.pD8ONjnlwkW0Wu_qgfOfUiC7N_EkEOv0bzDHUIVFFDg";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
});

export const getUsers = async () => {
  try {
    const response = await apiClient.get('/users');
    return response.data.users;
  } catch (error) {
    console.error('Error fetching users:', error?.response?.data || error.message);
    throw error;
  }
};

export const getPostsForUser = async (userId) => {
  try {
    const response = await apiClient.get(`/users/${userId}/posts`);
    return response.data.posts;
  } catch (error) {
    console.error(`Error fetching posts for user ${userId}:`, error?.response?.data || error.message);
    throw error;
  }
};

export const getCommentsForPost = async (postId) => {
  try {
    const response = await apiClient.get(`/posts/${postId}/comments`);
    return response.data.comments;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error?.response?.data || error.message);
    throw error;
  }
};

// const API_BASE_URL = "https://social-media-1-0-0-1.onrender.com";
// const API_BASE_URL = "http://localhost:3001";
const API_BASE_URL = process.env.REACT_APP_API_URL;

export const apiService = {
  register: async (formData) => {
    return await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      body: formData,
    });
  },
  login: async (values) => {
    return await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
  },
  signInByGoogle: async (token) => {
    return await fetch(`${API_BASE_URL}/auth/login/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: token }),
    });
  },
  getAllUsers: async (token) => {
    return fetch(`${API_BASE_URL}/users`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getUser: async (userId, token) => {
    return fetch(`${API_BASE_URL}/users/${userId}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  addUserToChats: async (chatId, token, loggedInUserId) => {
    return fetch(`${API_BASE_URL}/users/${chatId}/chats`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
  },
  getAllPosts: async (token) => {
    return fetch(`${API_BASE_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  patchFriend: async (userId,friendId, token) => {
    return fetch(`${API_BASE_URL}/users/${userId}/${friendId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  getUserFriends: async (userId, token) => {
    return fetch(`${API_BASE_URL}/users/${userId}/friends`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  updateFriend: async (_id, userId, token) => {
    return fetch(`${API_BASE_URL}/users/${_id}/${userId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  },
  updateLike: async (postId, token, loggedInUserId) => {
    return fetch(`${API_BASE_URL}/posts/${postId}/like`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
  },
  deletePost: async (postId, token, loggedInUserId) => {
    return fetch(`${API_BASE_URL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: loggedInUserId }),
    });
  },
  getPosts: async (token) => {
    return fetch(`${API_BASE_URL}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getUserPosts: async (userId, token) => {
    return fetch(`${API_BASE_URL}/posts/${userId}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  addPost: async (formData, token) => {
    return fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
  },
  getImages: (image) => {
    if (image?.includes("http") || image?.includes("https")) {
      return image;
    }
    return `${API_BASE_URL}/assets/${image}`;
  },
  addComment: async (postId, token, commentBody) => {
    return fetch(`${API_BASE_URL}/posts/${postId}/comment`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentBody),
    });
  },
  getAllPrivateChats: async (userId, token) => {
    return fetch(`${API_BASE_URL}/users/chats/getAll`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    });
  },
};

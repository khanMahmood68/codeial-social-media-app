import { API_URLS, LOCALSTORAGE_TOKEN_KEY, getFormBody } from "../utils";

const costumFetch = async (url, { body, ...customConfig }) => {
  const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);

  const headers = {
    "content-type": "application/x-www-form-urlencoded",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = getFormBody(body);
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (data.success) {
      return {
        data: data.data,
        success: true,
      };
    }
    throw new Error(data.message);
  } catch (error) {
    console.error("error");
    return {
      message: error.message,
      success: false,
    };
  }
};

export const getPosts = (page = 1, limit = 10) => {
  return costumFetch(API_URLS.posts(page, limit), {
    method: "GET",
  });
};

export const login = (email, password) => {
  return costumFetch(API_URLS.login(), {
    method: "POST",
    body: { email, password },
  });
};

export const register = async (name, email, password, confirmPassword) => {
  return costumFetch(API_URLS.signup(), {
    method: "POST",
    body: { name, email, password, confirm_password: confirmPassword },
  });
};

export const editProfile = async (userId, name, password, confirmPassword) => {
  return costumFetch(API_URLS.editUser(), {
    method: "POST",
    body: { id: userId, name, password, confirm_password: confirmPassword },
  });
};

export const fetchUserProfile = (userId) => {
  return costumFetch(API_URLS.userInfo(userId), {
    method: "GET",
  });
};

export const fetchUserFriends = () => {
  return costumFetch(API_URLS.friends(), {
    method: "GET",
  });
};

export const addFriend = (userId) => {
  return costumFetch(API_URLS.createFriendship(userId), {
    method: "POST",
  });
};

export const removeFriend = (userId) => {
  return costumFetch(API_URLS.removeFriend(userId), {
    method: "POST",
  });
};

export const addPost = (content) => {
  return costumFetch(API_URLS.createPost(), {
    method: "POST",
    body: { content },
  });
};

export const createComment = (content, postId) => {
  return costumFetch(API_URLS.comment(), {
    method: "POST",
    body: { content, post_id: postId },
  });
};

export const toggleLike = (itemId,itemType) => {
  return costumFetch(API_URLS.toggleLike(itemId,itemType), {
    method: "POST",
  });
};

export const searchUsers = (searchText) => {
  return costumFetch(API_URLS.searchUsers(searchText), {
    method: "GET",
  });
};

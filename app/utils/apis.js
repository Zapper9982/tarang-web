import axios from "axios";

// Use environment variable for API base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://tarangbackend.onrender.com";

export const login = (email, password) => {
  return axios.post(
    `${API_BASE_URL}/api/login`,
    {
      email,
      password,
    },
    {
      withCredentials: true,
    }
  );
};

export const register = (userDetails) => {
  return axios.post(
    `${API_BASE_URL}/api/register`,
    {
      ...userDetails,
    },
    {
      withCredentials: true,
    }
  );
};

export const verifyEmail = (token) => {
  return axios.put(`${API_BASE_URL}/api/verify/${token}`);
};
export const getUser = () => {
  return axios.get(`${API_BASE_URL}/api/user`, {
    withCredentials: true,
  });
};

/* Events */
export const getAllEvents = () => {
  return axios.get(`${API_BASE_URL}/api/events`);
};

export const getEvent = (eventSlug) => {
  return axios.get(`${API_BASE_URL}/api/events/${eventSlug}`);
};

export const registerEvent = (eventSlug, teamName, teamLeader, registerAs) => {
  return axios.post(
    `${API_BASE_URL}/api/events/register`,
    {
      slug: eventSlug,
      teamName,
      teamLeader,
      registerAs,
    },
    {
      withCredentials: true,
    }
  );
};

export const removeRegisteredEvent = (eventSlug) => {
  return axios.delete(`${API_BASE_URL}/api/events/remove`, {
    data: { slug: eventSlug },
    withCredentials: true,
  });
};

export const logout = () => {
  return axios.get(`${API_BASE_URL}/api/logout`, {
    withCredentials: true,
  });
};

export const verifyPayment = (tarangID) => {
  return axios.put(
    `${API_BASE_URL}/api/admin/verify`,
    {
      tarangID,
    },
    {
      withCredentials: true,
    }
  );
};

export const rejectPayment = (tarangID, comments) => {
  return axios.put(
    `${API_BASE_URL}/api/admin/reject`,
    {
      tarangID,
      rejectionReason: comments,
    },
    {
      withCredentials: true,
    }
  );
};

export const getUnverifiedUsers = () => {
  return axios.get(`${API_BASE_URL}/api/admin/unverified`, {
    withCredentials: true,
  });
};

export const getRejectedUsers = () => {
  return axios.get(`${API_BASE_URL}/api/admin/rejected`, {
    withCredentials: true,
  });
};

export const updateRejection = (tarangID) => {
  return axios.put(
    `${API_BASE_URL}/api/admin/updateRejection`,
    {
      tarangID,
    },
    {
      withCredentials: true,
    }
  );
};

export const getVerifiedUsers = () => {
  return axios.get(`${API_BASE_URL}/api/admin/verified`, {
    withCredentials: true,
  });
};

export const getUserByID = (userID) => {
  return axios.get(`${API_BASE_URL}/api/admin/user`, {
    params: {userID},
    withCredentials: true
  });
};

export const getUsersByEvent = (slug) => {
  return axios.get(`${API_BASE_URL}/api/admin/event/${slug}`, {
    withCredentials: true,
  });
};

export const getAllUsers = () => {
  return axios.get(`${API_BASE_URL}/api/admin`, {
    withCredentials: true,
  });
};
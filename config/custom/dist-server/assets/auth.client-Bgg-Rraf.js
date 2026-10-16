import { f as api } from "../entry.server.js";
const authClient = {
  refreshAccessTokenFn: async () => {
    const response = await api.get("auth/refresh");
    return response.data;
  },
  register: async (registerData) => {
    const response = await api.post("auth/register", registerData);
    return response.data;
  },
  login: async (user) => {
    const response = await api.post("auth/login", user);
    return response.data;
  },
  logout: async () => {
    const response = await api.post("auth/logout");
    return response.data;
  },
  forgotPassword: async (email) => {
    const response = await api.post("auth/forgot-password", email);
    return response.data;
  },
  verifyPasswordResetToken: async (token) => {
    const response = await api.get(`auth/reset-password/${token}`);
    return response.data;
  },
  resetPassword: async (token, resetData) => {
    const response = await api.post(`auth/reset-password/${token}`, resetData);
    return response.data;
  },
  getInvitation: async (token) => {
    const response = await api.get(`auth/invitation/${token}`);
    return response.data;
  },
  acceptInvitation: async (token, acceptData) => {
    const response = await api.post(`auth/invitation/${token}`, acceptData);
    return response.data;
  }
};
export {
  authClient as a
};

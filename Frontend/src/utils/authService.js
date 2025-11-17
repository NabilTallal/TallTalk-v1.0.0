import { axiosInstance } from "./axios.js";

export const authService = {
    checkAuth: () => axiosInstance.get("/auth/check"),
    signup: (credentials) => axiosInstance.post("/auth/signup", credentials),
    login: (credentials) => axiosInstance.post("/auth/login", credentials),
    logout: () => axiosInstance.post("/auth/logout"),
    updateProfile: (profileData) => axiosInstance.put("/auth/profile-update", profileData),
};

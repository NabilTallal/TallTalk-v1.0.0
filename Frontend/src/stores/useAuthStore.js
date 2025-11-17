import { create } from "zustand";
import toast from "react-hot-toast";

import { authService } from "../utils/authService";
import { socketService } from "../utils/socketService";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    socket: null,
    onlineUsers: [],

    // UI states
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,

    // AUTH ACTIONS

    checkAuth: async () => {
        try {
            const res = await authService.checkAuth();
            set({ authUser: res.data });
        } catch (error) {
            console.log("Auth check error:", error);
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (credentials) => {
        set({ isSigningUp: true });
        try {
            const res = await authService.signup(credentials);
            set({ authUser: res.data });
            toast.success("Account created successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Signup failed");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (credentials) => {
        set({ isLoggingIn: true });
        try {
            const res = await authService.login(credentials);
            set({ authUser: res.data });
            toast.success("Logged in successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logout: async () => {
        try {
            await authService.logout();
            socketService.disconnect();
            set({ authUser: null, socket: null, onlineUsers: [] });
            toast.success("Logged out successfully!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Logout failed");
        }
    },

    updateProfile: async (profileData) => {
        try {
            const res = await authService.updateProfile(profileData);
            set({ authUser: res.data });
            toast.success("Profile updated successfully!");
        } catch (error) {
            toast.error("Profile update failed.");
        }
    },

    // SOCKET ACTIONS

    connectSocket: () => {
        const { authUser, socket } = get();

        // prevent duplicate connections
        if (!authUser || socket?.connected) return;

        const newSocket = socketService.connect(authUser);
        if (!newSocket) return;

        set({ socket: newSocket });

        newSocket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds });
        });
    },

    disconnectSocket: () => {
        socketService.disconnect();
        set({ socket: null, onlineUsers: [] });
    },
}));
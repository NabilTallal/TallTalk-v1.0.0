import { create } from "zustand";
import {axiosInstance} from "../utils/axios.js";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
        } catch {
            console.log("Error in authCheck:", error);
        } finally {
            set({isCheckingAuth: false})
        }
    },

}))
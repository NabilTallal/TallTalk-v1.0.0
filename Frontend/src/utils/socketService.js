import { io } from "socket.io-client";
import { BASE_URL } from "./config";

let socket = null;

export const socketService = {
    connect(authUser) {
        if (!authUser || socket?.connected) return socket;

        socket = io(BASE_URL, { withCredentials: true });
        return socket;
    },

    disconnect() {
        if (socket?.connected) socket.disconnect();
    },

    getSocket() {
        return socket;
    }
};

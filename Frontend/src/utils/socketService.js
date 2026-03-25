import { io } from "socket.io-client";
import { BASE_URL } from "./constants.js";

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
    },

    on(event, callback) {
        if (!socket) return;
        socket.on(event, callback);
    },

    off(event) {
        if (!socket) return;
        socket.off(event);
    },

    emit(event, data) {
        if (!socket) return;
        socket.emit(event, data);
    },

    // Optional helper: remove all listeners
    removeAllListeners() {
        if (!socket) return;
        socket.removeAllListeners();
    }
};

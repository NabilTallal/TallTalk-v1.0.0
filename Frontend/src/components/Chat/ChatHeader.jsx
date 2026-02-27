import { MessageSquareOff } from "lucide-react";
import { useChatStore } from "../../stores/useChatStore.js";
import { useEffect } from "react";
import { useAuthStore } from "../../stores/useAuthStore.js";

function ChatHeader() {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const isOnline = onlineUsers.includes(selectedUser._id);

    useEffect(() => {
        const handleEscKey = (event) => {
            if (event.key === "Escape") setSelectedUser(null);
        };

        window.addEventListener("keydown", handleEscKey);
        return () => window.removeEventListener("keydown", handleEscKey);
    }, [setSelectedUser]);

    return (
        <div className="relative flex items-center justify-center px-6 py-10 max-w-[800px] w-full mx-auto max-h-[89px] shadow-current">

        {/* Curved glassy background */}
            <div className="absolute inset-0 rounded-b-[3rem] bg-gradient-to-r from-lime-900/20 via-lime-950/10 to-lime-900/20 backdrop-blur-lg shadow-xl overflow-hidden"></div>

            {/* Avatar + Name */}
            <div className="flex items-center space-x-4 absolute left-1/2 transform -translate-x-1/2">
                <div
                    className={`relative w-14 h-14 rounded-full p-[2px] ${
                        isOnline ? "bg-lime-500/50" : "bg-gray-700/30"
                    } before:absolute before:-inset-1 before:rounded-full before:bg-gradient-to-r before:from-lime-400 before:to-lime-600 before:opacity-50 before:blur-md
          ${isOnline ? "animate-pulse" : ""}`}
                >
                    <img
                        src={selectedUser.profilePic || "/avatar.png"}
                        alt={selectedUser.fullName}
                        className="w-full h-full object-cover rounded-full border-2 border-gray-800/40"
                    />
                </div>

                <div className="flex flex-col items-center">
                    <h3 className="text-lime-300 font-bold text-lg tracking-wider drop-shadow-md
                         bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-lime-200">
                        {selectedUser.fullName}
                    </h3>
                    <p
                        className={`text-sm ${isOnline ? "text-lime-400 animate-pulse" : "text-gray-400"}`}
                    >
                        {isOnline ? "Online" : "Offline"}
                    </p>
                </div>
            </div>

            {/* Close Button floating on right */}
            <button
                onClick={() => setSelectedUser(null)}
                className="absolute right-6 p-2 rounded-full hover:bg-lime-600/30 transition-all duration-300 flex items-center justify-center hover:scale-105"
            >
                <MessageSquareOff className="w-6 h-6 text-lime-400 hover:text-lime-200 drop-shadow-md transition-all" />
            </button>
        </div>
    );
}

export default ChatHeader;

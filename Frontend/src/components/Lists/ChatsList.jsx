import { useEffect, useState } from "react";
import { useChatStore } from "../../stores/useChatStore.js";
import ContactsLoader from "../loaders/ContactsLoader.jsx";
import NoChatsFound from "../Holders/NoChatsFound.jsx";
import { useAuthStore } from "../../stores/useAuthStore.js";
import { useUserStore} from "../../stores/useUserStore.js";

function ChatsList() {
    const { chats, setSelectedUser, selectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const { loadMyChatPartners } = useUserStore();
    const [activeChatId, setActiveChatId] = useState(null);

    useEffect(() => {
        loadMyChatPartners();
    }, [loadMyChatPartners]);

    // Reset active chat when leaving a chat
    useEffect(() => {
        if (!selectedUser) {
            setActiveChatId(null);
        }
    }, [selectedUser]);

    if (isUsersLoading) return <ContactsLoader />;
    if (chats.length === 0) return <NoChatsFound />;

    return (
        <div className="flex flex-col gap-2">
            {chats.map((chat) => {
                const isActive = chat._id === activeChatId;
                const isOnline = onlineUsers.includes(chat._id);

                return (
                    <div
                        key={chat._id}
                        onClick={() => {
                            setSelectedUser(chat);
                            setActiveChatId(chat._id);
                        }}
                        className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer border transition-all duration-300 
                            ${isActive
                            ? "bg-lime-800/40 border-lime-400/50 shadow-lg shadow-lime-900/40"
                            : "bg-lime-950/30 border-lime-700/30 hover:bg-lime-800/30 hover:border-lime-500/40"}
                        `}
                    >
                        <div className="relative">
                            <div className="size-12 rounded-full overflow-hidden border border-lime-500/30 shadow-inner">
                                <img
                                    src={chat.profilePic || "/avatar.png"}
                                    alt={chat.fullName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {isOnline && (
                                <span className="absolute top-0 right-0 size-3 bg-lime-700 rounded-full border-2 border-lime-950/70 shadow-md" />
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="text-slate-100 font-semibold truncate">{chat.fullName}</h4>
                            <p className="text-sm text-slate-400 truncate">Send a message.</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ChatsList;

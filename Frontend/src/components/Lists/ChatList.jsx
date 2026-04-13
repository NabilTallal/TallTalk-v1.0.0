import { useEffect, useState } from "react";
import { chatStore } from "../../stores/chatStore.js";
import ContactsLoader from "../Loaders/ContactsLoader.jsx";
import NoChatsFound from "../Holders/NoChatsFound.jsx";
import { authStore } from "../../stores/authStore.js";
import { userStore } from "../../stores/userStore.js";

function ChatList() {
    const { setSelectedUser, selectedUser } = chatStore();
    const { onlineUsers } = authStore();
    const { chats: partners, loadMyChatPartners, isUsersLoading } = userStore();
    const [activePartnerId, setActivePartnerId] = useState(null);

    useEffect(() => {
        loadMyChatPartners();
    }, [loadMyChatPartners]);

    // Reset active chat when leaving a chat
    useEffect(() => {
        if (!selectedUser) {
            setActivePartnerId(null);
        }
    }, [selectedUser]);

    if (isUsersLoading) return <ContactsLoader />;
    if (partners.length === 0) return <NoChatsFound />;

    return (
        <div className="flex flex-col gap-2">
            {partners.map((partner) => {
                const isActive = partner._id === activePartnerId;
                const isOnline = onlineUsers.includes(partner._id);

                return (
                    <div
                        key={partner._id}
                        onClick={() => {
                            setSelectedUser(partner);
                            setActivePartnerId(partner._id);
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
                                    src={partner.profilePic || "/avatar.png"}
                                    alt={partner.fullName}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {isOnline && (
                                <span className="absolute top-0 right-0 size-3 bg-lime-700 rounded-full border-2 border-lime-950/70 shadow-md" />
                            )}
                        </div>

                        <div className="flex-1 min-w-0">
                            <h4 className="text-slate-100 font-semibold truncate">
                                {partner.fullName}
                            </h4>
                            <p className="text-sm text-slate-400 truncate">
                                Send a message.
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default ChatList;

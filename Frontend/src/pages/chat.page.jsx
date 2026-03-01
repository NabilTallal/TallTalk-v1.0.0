import { useChatStore } from "../stores/useChatStore";
import ProfileHeader from "../components/chat/ProfileHeader.jsx";
import ChatViewSelector from "../components/chat/ChatViewSelector.jsx";
import ChatsList from "../components/lists/ChatsList.jsx";
import ContactList from "../components/lists/ContactsList.jsx";
import ChatContainer from "../components/chat/ChatContainer.jsx";
import NoConversationPlaceholder from "../components/Holders/NoConversationPlaceholder.jsx";

function ChatPage() {
    const { activeTab, selectedUser } = useChatStore();

    return (
        <div className="relative w-full max-w-6xl h-[700px] blur-none">
            <div className="flex w-full h-full rounded-2xl overflow-hidden backdrop-blur-md border border-white/10 shadow-xl">
                {/* LEFT SIDE */}
                <div className=" w-80 bg-gradient-to-tr from-lime-900/95 via-lime-950/80 to-lime-900/30 border-r border-lime-400/50 flex flex-col backdrop-blur-3xl bg-opacity-5">
                    <ProfileHeader />
                    <ChatViewSelector />

                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                        {activeTab === "chats" ? <ChatsList /> : <ContactList />}
                    </div>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex-1 flex flex-col bg-gradient-to-b from-lime-950/70 via-lime-950/50 to-lime-900/50 backdrop-blur-3xl shadow-inner">
                    {selectedUser ? (
                        <ChatContainer />
                    ) : (
                        <NoConversationPlaceholder />
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChatPage;

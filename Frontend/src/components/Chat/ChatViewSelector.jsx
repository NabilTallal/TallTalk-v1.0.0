import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useChatStore } from "../../stores/useChatStore.js";

function ChatViewSelector() {
    const { activeTab, setActiveTab } = useChatStore();
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (tab) => {
        setActiveTab(tab);
        setIsOpen(false);
    };

    return (
        <div className="relative w-36 mx-auto mt-3">
            {/* Dropdown button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full h-9 flex items-center justify-center gap-2
                   bg-lime-900/20 border border-lime-700/40 rounded-full
                   backdrop-blur-md shadow-inner shadow-lime-950/40
                   text-lime-200 text-sm font-medium hover:bg-lime-800/30 transition-all"
            >
                <span>{activeTab === "chats" ? "Recent" : "All Users"}</span>
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div
                    className="absolute left-0 right-0 mt-2 bg-lime-900/90 border border-lime-700/40
                     rounded-xl shadow-lg backdrop-blur-md overflow-hidden z-10"
                >
                    <button
                        onClick={() => handleSelect("chats")}
                        className={`w-full px-4 py-2 text-sm text-center transition 
                        ${
                            activeTab === "chats"
                                ? "bg-lime-700/30 text-lime-200"
                                : "text-slate-300 hover:bg-lime-800/40"
                        }`}
                    >
                        Recent
                    </button>
                    <button
                        onClick={() => handleSelect("contacts")}
                        className={`w-full px-4 py-2 text-sm text-center transition 
                        ${
                            activeTab === "contacts"
                                ? "bg-lime-700/30 text-lime-200"
                                : "text-slate-300 hover:bg-lime-800/40"
                        }`}
                    >
                        All Users
                    </button>
                </div>
            )}
        </div>
    );
}

export default ChatViewSelector;

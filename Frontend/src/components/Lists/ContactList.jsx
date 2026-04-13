import { useEffect } from "react";
import { chatStore } from "../../stores/chatStore.js";
import ContactsLoader from "../Loaders/ContactsLoader.jsx";
import { authStore } from "../../stores/authStore.js";
import { userStore } from "../../stores/userStore.js";

function ContactList() {
    const { setSelectedUser } = chatStore();
    const { allContacts, loadAllContacts,  isContactsLoading} = userStore();
    const { onlineUsers } = authStore();

    useEffect(() => {
        loadAllContacts();
    }, [loadAllContacts]);

    if (isContactsLoading) return <ContactsLoader />;

    return (
        <div className="space-y-2">
            {allContacts.map((contact) => (
                <div
                    key={contact._id}
                    onClick={() => setSelectedUser(contact)}
                    className="flex items-center gap-3 p-4 rounded-xl cursor-pointer
                     bg-gradient-to-r from-lime-900/30 via-lime-800/20 to-lime-900/30
                     border border-lime-400/30 shadow-inner
                     hover:from-lime-700/70 hover:via-lime-600/60 hover:to-lime-700/70
                     hover:border-lime-500/40 transition-all duration-300 group"
                >
                    {/* AVATAR */}
                    <div className="relative">
                        <div className="size-12 rounded-full overflow-hidden border-2 border-lime-400/50">
                            <img
                                src={contact.profilePic || "/avatar.png"}
                                alt={contact.fullName}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        {onlineUsers.includes(contact._id) && (
                            <span className="absolute top-0 right-0 w-3 h-3 bg-lime-600 rounded-full border border-lime-900 shadow-sm shadow-lime-600/50"></span>
                        )}
                    </div>

                    {/* USER NAME */}
                    <div className="flex-1">
                        <h4 className="text-slate-200 font-medium truncate group-hover:text-lime-300 transition">
                            {contact.fullName}
                        </h4>
                        <p className="text-xs text-slate-500">Start a new conversation.</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ContactList;

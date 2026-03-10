import { useState, useRef } from "react";
import { Power, Info } from "lucide-react";
import { authStore } from "../../stores/authStore.js";

function UserHeader() {
    const { logout, authUser, updateProfile } = authStore();
    const [selectedImg, setSelectedImg] = useState(null);
    const fileInputRef = useRef(null);

    const createdAt = new Date(authUser.createdAt);
    const formattedDate = createdAt.toLocaleDateString("en-GB", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
    });
    const daysAgo = Math.floor((Date.now() - createdAt) / (1000 * 60 * 60 * 24));

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile({ profilePic: base64Image });
        };
    };

    return (
        <div className="relative border-b border-lime-700/40 backdrop-blur-xl overflow-hidden">
            {/* glowing gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-lime-950/50 via-lime-900/30 to-lime-800/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(163,230,53,0.08),transparent_60%)]" />
            <div className="relative flex items-center justify-between px-5 py-4 z-10">

                {/* Left: Avatar + Info */}
                <div className="flex items-center gap-4">
                    {/* Avatar with glowing ring */}
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="relative size-14 rounded-full overflow-hidden group
                                   ring-1 ring-lime-600/30 hover:ring-lime-400/50
                                   shadow-[0_0_15px_rgba(163,230,53,0.15)] transition-all duration-300"
                    >
                        <img
                            src={selectedImg || authUser.profilePic || '/avatar.png'}
                            alt="User"
                            className="object-cover size-full"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
                                        flex items-center justify-center transition-all duration-300">
                            <span className="text-xs text-lime-300 font-medium">Change</span>
                        </div>
                    </button>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                    />

                    {/* User info */}
                    <div>
                        <h3 className="text-lime-100 font-semibold text-base tracking-wide drop-shadow-[0_0_6px_rgba(163,230,53,0.2)]">
                            {authUser.fullName}
                        </h3>
                        <p className="text-xs text-lime-400/80 mt-0.5">Online</p>
                    </div>

                    {/* Subtle info icon tooltip */}
                    <div className="relative inline-block ml-1">
                        <Info className="peer w-4 h-4 text-slate-400 hover:text-lime-300 cursor-pointer transition" />
                        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 opacity-0 peer-hover:opacity-100
                                        transition-opacity duration-300 bg-lime-950/80 backdrop-blur-sm border border-lime-700/40
                                        text-lime-200 text-[11px] rounded px-2 py-1 whitespace-nowrap shadow-[0_0_8px_rgba(163,230,53,0.15)] z-9999">
                            Joined {daysAgo} days ago in {formattedDate}.
                        </div>
                    </div>
                </div>

                {/* Logout button */}
                <button
                    onClick={logout}
                    className="p-2 rounded-full bg-lime-900/20 text-lime-400 hover:text-red-400
                               hover:bg-red-900/20 shadow-inner shadow-lime-950/50 transition-all duration-200"
                >
                    <Power size={18} />
                </button>
            </div>
        </div>
    );
}

export default UserHeader;

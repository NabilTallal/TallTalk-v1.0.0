import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { MailIcon, LoaderIcon, LockIcon } from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const { login, isLoggingIn } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };

    return (
        <div className="relative w-full h-screen flex items-center justify-center p-4  overflow-hidden">
            {/* Ambient floating glow behind card */}
            <div className="absolute w-[500px] h-[500px] bg-lime-500/10 blur-3xl animate-pulse-slow rounded-full"></div>

            {/* LOGIN CARD */}
            <div className="relative w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-br from-lime-600/40 to-transparent shadow-[0_0_60px_rgba(100,255,100,0.08)] backdrop-blur-md opacity-95">
                <div className="rounded-2xl bg-black/50 p-8 backdrop-blur-xl border border-lime-400/20 shadow-[0_0_20px_rgba(132,255,100,0.05)]">

                    {/* HEADER */}
                    <div className="text-center mb-8 relative flex flex-col items-center">
                        {/* Floating Logo Container */}
                        <div className="relative mb-4 w-24 h-24 flex items-center justify-center rounded-full bg-lime-950/50 border border-lime-400/30 shadow-[0_0_35px_rgba(132,255,100,0.25)] animate-float">
                            {/* Soft aura glow behind logo */}
                            <div className="absolute inset-0 rounded-full blur-2xl bg-lime-500/20 animate-pulse-slow"></div>

                            <img
                                src="/TallTalk_Logo.png"
                                alt="TallTalk Logo"
                                className="w-16 h-16 drop-shadow-[0_0_15px_rgba(132,255,100,0.9)] animate-glow"
                            />
                        </div>

                        <h2 className="text-2xl font-semibold text-white mb-1">Welcome Back</h2>
                        <p className="text-gray-400 text-sm">Login to access your account</p>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm text-gray-200 mb-1">Email</label>
                            <div className="relative">
                                <MailIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-10 pr-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500/40 transition"
                                    placeholder="johndoe@gmail.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-200 mb-1">Password</label>
                            <div className="relative">
                                <LockIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-10 pr-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500/40 transition"
                                    placeholder="Enter your password"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className="w-full py-2 rounded-md bg-lime-600/70 text-white font-medium hover:bg-lime-600 transition disabled:opacity-50 shadow-[0_0_15px_rgba(132,255,100,0.25)]"
                        >
                            {isLoggingIn ? (
                                <LoaderIcon className="h-5 w-5 animate-spin mx-auto" />
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <div className="mt-4 text-center">
                        <Link
                            to="/signup"
                            className="text-sm text-gray-300 hover:text-white transition"
                        >
                            Don’t have an account? <span className="text-lime-400">Sign Up</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;

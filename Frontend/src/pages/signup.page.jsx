import { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { LockIcon, MailIcon, UserIcon, LoaderIcon } from "lucide-react";
import { Link } from "react-router";

function SignUpPage() {
    const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
    const { signup, isSigningUp } = useAuthStore();

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData);
    };

    return (
        <div className="w-full h-screen flex items-center justify-center p-4 bg-gradient-to-b ">
            {/* CARD BORDER GLOW */}
            <div className="w-full max-w-md p-[1px] rounded-2xl bg-gradient-to-br from-lime-600/40 to-transparent shadow-[0_0_40px_rgba(100,255,100,0.05)] backdrop-blur-md opacity-90">
                <div className="rounded-2xl bg-black/40 p-8">

                    {/* HEADER */}
                    <div className="text-center mb-8">
                        {/* CENTERED CIRCULAR LOGO CONTAINER */}
                        <div
                            className="mx-auto w-28 h-28 rounded-full bg-lime-950/60 backdrop-blur-md
                                       flex items-center justify-center mb-6
                                       border border-lime-400/30 shadow-[0_0_30px_rgba(132,255,100,0.25)]
                                       hover:shadow-[0_0_50px_rgba(132,255,100,0.45)]
                                       transition-all duration-500 ease-in-out"
                        >
                            <img
                                src="/logo.png"
                                alt="TallTalk Logo"
                                className="w-16 h-16 drop-shadow-[0_0_12px_rgba(132,255,100,0.7)] animate-float"
                            />
                        </div>

                        <h2 className="text-2xl font-semibold text-white mb-2">Create Account</h2>
                        <p className="text-gray-300 text-sm">Sign up for a new account</p>
                    </div>

                    {/* FORM */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* FULL NAME */}
                        <div>
                            <label className="block text-sm text-gray-200 mb-1">Full Name</label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                    className="w-full pl-10 pr-3 py-2 rounded-md bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-lime-500/40 transition"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        {/* EMAIL */}
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

                        {/* PASSWORD */}
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

                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            disabled={isSigningUp}
                            className="w-full py-2 rounded-md bg-lime-600/70 text-white font-medium hover:bg-lime-600 transition disabled:opacity-50"
                        >
                            {isSigningUp ? (
                                <LoaderIcon className="h-5 w-5 animate-spin mx-auto" />
                            ) : (
                                "Create Account"
                            )}
                        </button>
                    </form>

                    {/* LINK */}
                    <div className="mt-4 text-center">
                        <Link
                            to="/login"
                            className="text-sm text-gray-300 hover:text-white transition"
                        >
                            Already have an account? <span className="text-lime-400">Login</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;

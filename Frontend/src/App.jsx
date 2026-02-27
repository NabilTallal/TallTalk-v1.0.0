import { Routes, Route, Navigate} from "react-router";
import AnimatedBackground from "./components/Background/AnimatedBackground.jsx";
import ChatPage from "./pages/chat.page.jsx";
import LoginPage from "./pages/login.page.jsx";
import SignUpPage from "./pages/signup.page.jsx";
import {useAuthStore} from "./stores/useAuthStore.js";
import {useEffect} from "react";
import PageLoader from "./components/Loaders/PageLoader.jsx";
import {Toaster} from "react-hot-toast";

function App() {
    const {checkAuth, isCheckingAuth, authUser} = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth()]);

    if(isCheckingAuth) return <PageLoader/>

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-transparent">

            {/* BACKGROUND */}
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <AnimatedBackground />
            </div>

            {/* FOREGROUND - NOW WE CENTER THIS */}
            <div className="relative z-10 flex items-center justify-center w-full h-full p-4">
                <Routes>
                    <Route path="/" element={authUser ? <ChatPage /> : <Navigate to={"/login"} />} />
                    <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
                    <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
                </Routes>
                <Toaster />
            </div>

        </div>
    )
}

export default App;
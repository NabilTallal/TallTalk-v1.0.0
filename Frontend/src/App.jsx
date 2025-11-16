import { Routes, Route, Navigate} from "react-router";
import AnimatedBackground from "./components/background/AnimatedBackground.jsx";
import ChatPage from "./pages/chat.page.jsx";
import LoginPage from "./pages/login.page.jsx";
import SignUpPage from "./pages/signup.page.jsx";
import {useAuthStore} from "./stores/useAuthStore.js";
import {useEffect} from "react";
import PageLoader from "./components/loaders/PageLoader.jsx";

function App() {
    const {checkAuth, isCheckingAuth, authUser} = useAuthStore();

    useEffect(() => {
        checkAuth();
    }, [checkAuth()]);

    if(isCheckingAuth) return <PageLoader/>

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-transparent">
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <AnimatedBackground />
            </div>

            <div className="relative z-10 flex items-center justify-center bg-transparent">
                <Routes>
                    <Route path="/" element={authUser ? <ChatPage /> : <Navigate to="/login"/>}  />
                    <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/"/>} />
                    <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/"/>} />
                </Routes>
            </div>
        </div>
    )
}

export default App;
import { Routes, Route, Navigate} from "react-router";
import AnimatedBackground from "./components/background/AnimatedBackground.jsx";
import ChatPage from "./pages/chat.page.jsx";
import LoginPage from "./pages/login.page.jsx";
import SignUpPage from "./pages/signup.page.jsx";

function App() {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-transparent">
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <AnimatedBackground />
            </div>

            <div className="relative z-10 flex items-center justify-center bg-transparent">
                <Routes>
                    <Route path="/" element={ <ChatPage />} />
                    <Route path="/login" element={ <LoginPage />} />
                    <Route path="/signup" element={ <SignUpPage />} />
                </Routes>
            </div>
        </div>
    )
}

export default App;
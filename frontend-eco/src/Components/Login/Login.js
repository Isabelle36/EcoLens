import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { useNavigate,Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (isLoading) return;
        setIsLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast.success("Login successful!"); 
            navigate("/");
        } catch (error) {
            console.error(error.code, error.message); 
            toast.error("Login failed: " + error.message); 
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            toast.success(`Welcome back, ${user.displayName}!`);
            navigate("/");
        } catch (error) {
            console.error(error.code, error.message);
            toast.error("Google login failed: " + error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
                <h2 className="text-center text-2xl font-bold">Log In</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={isLoading} 
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:bg-gray-400"
                    >
                        {isLoading ? "Logging In..." : "Log In"}
                    </button>
                </form>

                <button
                    onClick={handleGoogleLogin} 
                    className="w-full bg-red-500 text-white py-2 rounded-lg mt-4 hover:bg-red-600 transition"
                >
                    Log In with Google
                </button>

                <p className="text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-blue-500 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;

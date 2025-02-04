import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../Firebase/Firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
     const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();

        if (isLoading) return; 
        setIsLoading(true);

        // Validate email
        if (!email.includes("@") || !email.includes(".")) {
            toast.error("Please enter a valid email address.");
            setIsLoading(false);
            return;
        }

        // Validate password
        if (password.length < 6) {
            toast.error("Password must be at least 6 characters long.");
            setIsLoading(false);
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast.success("Signup successful!");
            navigate("/");
        } catch (error) {
            console.error(error.code, error.message); 
            toast.error("Signup failed: " + error.message); 
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignup = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            toast.success(`Welcome, ${user.displayName}!`);
            navigate("/");
        } catch (error) {
            console.error(error.code, error.message);
            toast.error("Google signup failed: " + error.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-lg">
                <h2 className="text-center text-2xl font-bold">Sign Up</h2>
                <form onSubmit={handleSignup} className="space-y-4">
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
                        className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition disabled:bg-gray-400"
                    >
                        {isLoading ? "Signing Up..." : "Sign Up"}
                    </button>
                </form>

                <button
                    onClick={handleGoogleSignup} 
                    className="w-full bg-red-500 text-white py-2 rounded-lg mt-4 hover:bg-red-600 transition"
                >
                    Sign Up with Google
                </button>

                <p className="text-center text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-500 hover:underline">
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignUp;

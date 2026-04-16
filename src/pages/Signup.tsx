// Minor changes using AI cuz.. lockin deadline :cry:

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabase";
import Logo from "../components/Logo";

export default function Signup() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const isValidEmail = email.length === 0 || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isValidEmail) return;
        if (password !== confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: { data: { name } }
        });

        if (error) {
            setError(error.message);
        } else {
            alert("Signup successful! I hope you remember what you owe now 😉");
            navigate("/login");
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center min-h-screen px-6">
            <Logo />
            <div className="w-full max-w-sm mt-8 bg-menu/20 p-8 rounded-[32px] border-2 border-menu backdrop-blur-sm shadow-xl">

                <h2 className="font-branding text-[32px] md:text-[42px] leading-tight text-center mb-6">
                    Sign Up
                </h2>

                <form onSubmit={handleSignup} className="flex flex-col gap-4">
                    <input
                        type="text" placeholder="Name" required value={name}
                        onChange={e => setName(e.target.value)}
                        className="w-full bg-forebackground text-foreground placeholder-foreground/60 px-5 py-3 rounded-full text-body-main focus:outline-none focus:ring-2 focus:ring-menu"
                    />

                    <div className="flex flex-col">
                        <input
                            type="email" placeholder="Email Address" required value={email}
                            onChange={e => setEmail(e.target.value)}
                            className={`w-full bg-forebackground text-foreground placeholder-foreground/60 px-5 py-3 rounded-full text-body-main focus:outline-none focus:ring-2 ${!isValidEmail ? 'ring-2 ring-maindarker' : 'focus:ring-menu'}`}
                        />
                        {!isValidEmail && (
                            <span className="text-maindarker text-body-secondary mt-1 ml-4 leading-none">
                                Please enter a valid email address
                            </span>
                        )}
                    </div>

                    <input
                        type="password" placeholder="Password" required value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full bg-forebackground text-foreground placeholder-foreground/60 px-5 py-3 rounded-full text-body-main focus:outline-none focus:ring-2 focus:ring-menu"
                    />

                    <input
                        type="password" placeholder="Confirm Password" required value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="w-full bg-forebackground text-foreground placeholder-foreground/60 px-5 py-3 rounded-full text-body-main focus:outline-none focus:ring-2 focus:ring-menu"
                    />

                    {error && (
                        <p className="text-maindarker text-body-secondary text-center">
                            {error}
                        </p>
                    )}

                    {/* Updated Button: Body Typeface, Heading Size, inline-block for mt-3 pushing */}
                    <button disabled={loading || !isValidEmail} className="mt-4 w-full bg-main text-foreground px-5 py-3 rounded-full hover:opacity-90 transition disabled:opacity-50 font-body text-[32px] md:text-[42px] leading-none text-center">
                        <span className="inline-block">{loading ? "Creating..." : "Sign Up"}</span>
                    </button>

                </form>

                <p className="mt-6 text-center text-body-secondary">
                    Already have an account? <Link to="/login" className="text-maindarker hover:underline">Login</Link>
                </p>
            </div>
        </div>
    );
}

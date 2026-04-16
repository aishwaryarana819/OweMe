// Minor changes with AI... cuz lockin deadline

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import Logo from '../components/Logo';

export default function Login() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            setError(error.message);
        } else {
            navigate('/');
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center min-h-screen px-6 py-12">
            <Logo />

            <div className="w-full max-w-sm mt-8 bg-menu/20 p-8 rounded-[32px] border-2 border-menu backdrop-blur-sm shadow-xl">

                <h2 className="font-branding text-[32px] md:text-[42px] leading-tight text-center mb-6">
                    Login
                </h2>

                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <input
                        type="email" placeholder="Email Address" required value={email} onChange={e => setEmail(e.target.value)}
                        className="w-full bg-forebackground text-foreground placeholder-foreground/60 px-5 py-3 rounded-full text-body-main focus:outline-none focus:ring-2 focus:ring-menu"
                    />

                    <input
                        type="password" placeholder="Password" required value={password} onChange={e => setPassword(e.target.value)}
                        className="w-full bg-forebackground text-foreground placeholder-foreground/60 px-5 py-3 rounded-full text-body-main focus:outline-none focus:ring-2 focus:ring-menu"
                    />

                    {error && <p className="text-maindarker text-body-secondary text-center">{error}</p>}

                    <button disabled={loading} className="mt-4 w-full bg-main text-foreground px-5 py-3 rounded-full hover:opacity-90 transition disabled:opacity-50 font-body text-[32px] md:text-[42px] leading-none text-center">
                        <span className="inline-block">{loading ? "Logging in..." : "Login"}</span>
                    </button>

                </form>

                <div className="mt-6 text-center text-body-secondary flex flex-col gap-2">
                    <Link to="/forgot-password" className="text-maindarker hover:underline">Forgot password?</Link>
                    <p>
                        New here? <Link to="/signup" className="text-main hover:underline">Sign up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

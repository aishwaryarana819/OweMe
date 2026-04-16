import React, { useState } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';

export default function Settings() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogout = async () => {
        setLoading(true);
        await supabase.auth.signOut();
    };

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-lg flex flex-col items-center">
                <Logo />
                <div className="w-full mt-6 bg-menu/20 p-8 rounded-[32px] border-2 border-menu backdrop-blur-sm shadow-xl flex flex-col items-center">
                    <h2 className="font-branding text-[32px] md:text-[42px] leading-tight text-center mb-6">Settings</h2>

                    <div className="bg-forebackground p-6 rounded-[24px] w-full text-center shadow-inner mb-6">
                        <p className="font-headings text-[26px] text-foreground">Logged in as:</p>
                        <p className="font-body text-[30px] text-foreground/80 mt-2">{user?.user_metadata?.name || 'User'}</p>
                        <p className="font-body text-[22px] text-menu">{user?.email}</p>
                    </div>

                    <button onClick={handleLogout} disabled={loading} className="w-full bg-main text-foreground px-5 py-3 rounded-full font-body text-[32px] md:text-[42px] leading-none text-center hover:opacity-90 transition shadow-md">
                        <span className="inline-block mt-3">{loading ? 'Signing out...' : 'Sign Out'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

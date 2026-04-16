import React from "react";
import {Link} from "react-router-dom";
import {ClockIcon} from "@heroicons/react/24/solid";
import Logo from "../components/Logo";

export default function ForgotPassword() {
    return (
        <div className="flex flex-col items-center min-h-screen px-6 py-12">
            <Logo/>

            <div className="w-full max-w-sm mt-8 bg-menu/10 p-8 rounded-[32px]
            border-2 border-menu/50 backdrop-blur-sm flex flex-col items-center
            text-center shadow-md">
                <ClockIcon className="size-20 text-main mb-4 opacity-80"/>
                <h2 className="text-heading text-main mb-4">Coming Soon</h2>
                <p className="text-body-secondary mb-8">
                    For now, this webapp is only meant to test. You may create another account with a non-existing email to test.
                </p>

                <Link to="/login" className="w-full bg-forebackground text-background
                px-5 py-3 rounded-full text-heading hover:opacity-90 transition inline-block">
                    Back to Login
                </Link>
            </div>
        </div>
    );
}
import React from "react";
import {Link} from "react-router-dom";

export default function Logo() {
    return (
        <Link to="/" className="inline-block text-center w-full my-4 hover:opacity-90 transition-opacity">
            <h1 className="text-branding bg-gradient-to-b from-main to-maindarker text-transparent
            bg-clip-text drop-shadow-sm">
                OweMe
            </h1>
        </Link>
    );
}
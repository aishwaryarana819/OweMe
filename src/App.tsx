import React from "react";
import {BrowserRouter} from "react-router-dom";
import Logo from "./components/Logo";
import BottomNav from "./components/BottomNav.tsx";

export default function App() {
    return (
        <BrowserRouter>
            <div className="flex flex-col items-center p-1 relative min-h-screen">
                <Logo/>

                <div className="w-full max-w-lg h-96 bg-menu/20 rounded-[32px] mt-8 flex
                items-center justify-center border-4 border-dashed border-menu">
                    <p className="text-body-main text-foreground opacity-50">
                        ContentArea
                    </p>
                </div>

                <BottomNav/>

            </div>
        </BrowserRouter>
    );
}
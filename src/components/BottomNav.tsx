/*
For shipwrights, fraud squad & GOI:
Wrote the code myself but then made changes via AI. Copy-pasted the result here.
*/

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cog8ToothIcon, ArrowDownCircleIcon, GiftIcon, PlusIcon } from '@heroicons/react/24/solid';

export default function BottomNav() {
    const location = useLocation();

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 z-50 w-full max-w-lg px-4">

            {location.pathname !== '/settings' && (
                <Link to="/settings" className="bg-forebackground text-foreground p-3 rounded-full flex-shrink-0 hover:opacity-90 transition shadow-md cursor-pointer">
                    <Cog8ToothIcon className="size-9" />
                </Link>
            )}

            {location.pathname !== '/borrowings' && (
                <Link to="/borrowings" className="flex items-center gap-2 bg-forebackground text-foreground
                px-4 py-0.8 rounded-full flex-shrink-0 hover:opacity-90 transition shadow-md cursor-pointer">
                    <ArrowDownCircleIcon className="size-10" />
                    <span className="hidden md:inline text-heading  mt-3">
            Borrowings
          </span>
                </Link>
            )}

            {location.pathname !== '/lendings' && (
                <Link to="/lendings" className="flex items-center gap-2 bg-forebackground text-foreground
                px-4 py-0.8 rounded-full flex-shrink-0 hover:opacity-90 transition shadow-md cursor-pointer">
                    {/* Changed to HandRaised to replace the dollar icon */}
                    <GiftIcon className="size-8.5" />
                    <span className="hidden md:inline text-heading mt-3">
            Lendings
          </span>
                </Link>
            )}

            <button className="bg-forebackground text-foreground p-3 rounded-full flex-shrink-0 hover:opacity-90 transition shadow-md cursor-pointer">
                {/* Changed to plain Plus without the circle */}
                <PlusIcon className="size-9 stroke-[10]" />
            </button>

        </nav>
    );
}

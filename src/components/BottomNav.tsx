import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Cog8ToothIcon, ArrowDownCircleIcon, GiftIcon, PlusIcon } from '@heroicons/react/24/solid';

interface BottomNavProps {
    onAddClick?: () => void;
}

export default function BottomNav({ onAddClick }: BottomNavProps) {
    const location = useLocation();

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-3 z-50 w-full max-w-lg px-4">

            {location.pathname !== '/settings' && (
                <Link to="/settings" className="bg-forebackground text-foreground p-3 rounded-full flex-shrink-0 hover:opacity-90 transition shadow-md cursor-pointer">
                    <Cog8ToothIcon className="size-7" />
                </Link>
            )}

            {location.pathname !== '/borrowings' && (
                <Link to="/borrowings" className="flex items-center gap-2 bg-forebackground text-foreground px-5 rounded-full flex-shrink-0 hover:opacity-90 transition shadow-md cursor-pointer">
                    <ArrowDownCircleIcon className="size-7" />
                    <span className="hidden md:inline text-heading mt-3">
            Borrowings
          </span>
                </Link>
            )}

            {location.pathname !== '/lendings' && (
                <Link to="/lendings" className="flex items-center gap-2 bg-forebackground text-foreground px-5  rounded-full flex-shrink-0 hover:opacity-90 transition shadow-md cursor-pointer">
                    <GiftIcon className="size-9" />
                    <span className="hidden md:inline text-heading mt-3">
            Lendings
          </span>
                </Link>
            )}

            <button onClick={onAddClick} className="bg-forebackground text-foreground p-3 rounded-full flex-shrink-0 hover:opacity-90 transition shadow-md cursor-pointer">
                <PlusIcon className="size-8 stroke-[10]" />
            </button>

        </nav>
    );
}

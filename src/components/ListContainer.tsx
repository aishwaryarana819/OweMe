import React from 'react';
import ItemRow from './ItemRow';
import type { Item } from '../hooks/useItems';

interface ListContainerProps {
    title: string;
    items: Item[];
    isArchivedView: boolean;
    onToggleArchive?: () => void;
    onItemClick: (item: Item) => void;
    showArchiveToggle?: boolean;
}

export default function ListContainer({ title, items, isArchivedView, onToggleArchive, onItemClick, showArchiveToggle = true }: ListContainerProps) {
    return (
        <div className="w-full max-w-lg mt-6 mb-24 bg-menu p-6 rounded-[32px] border-2 border-menu/50 shadow-xl relative min-h-[400px] flex flex-col">
            <h2 className="font-branding text-[32px] md:text-[42px] leading-tight text-foreground mb-4">
                {title}
            </h2>

            <div className="flex-1 overflow-y-auto space-y-1 pb-12">
                {items.length === 0 ? (
                    <p className="text-foreground/70 text-center mt-10 font-body text-[26px]">No items found.</p>
                ) : (
                    items.map(item => (
                        <ItemRow key={item.id} item={item} onClick={onItemClick} />
                    ))
                )}
            </div>

            {showArchiveToggle && onToggleArchive && (
                <button
                    onClick={onToggleArchive}
                    className="absolute bottom-6 right-6 font-headings text-[26px] text-foreground hover:opacity-80 transition flex items-center"
                >
                    {isArchivedView ? '< Active' : 'Archived >'}
                </button>
            )}
        </div>
    );
}

import React from 'react';
import type { Item } from '../hooks/useItems';

export default function ItemRow({ item, onClick }: { item: Item, onClick: (item: Item) => void }) {
    const isBorrowing = item.type === 'borrowing';
    const labelText = isBorrowing ? 'To Return:' : 'Get Back:';

    let displayDate = 'No date';
    if (item.promised_return_date) {
        const d = new Date(item.promised_return_date);
        displayDate = d.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    return (
        <button
            onClick={() => onClick(item)}
            className="w-full flex justify-between items-center text-left hover:bg-white/10 px-4 py-2 rounded-xl transition"
        >
            <span className="text-body-main text-foreground truncate w-1/2 pr-2">{item.name}</span>
            <div className="flex gap-2 items-center whitespace-nowrap">
                <span className="text-body-main text-maindarker">{labelText}</span>
                <span className="text-body-main text-foreground">{displayDate}</span>
            </div>
        </button>
    );
}

import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Item } from '../hooks/useItems';

interface ItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    itemToEdit: Item | null;
}

export default function ItemModal({ isOpen, onClose, itemToEdit }: ItemModalProps) {
    const { session } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState('');
    const [type, setType] = useState<'borrowing' | 'lending'>('borrowing');
    const [date, setDate] = useState('');
    const [isArchived, setIsArchived] = useState(false);

    useEffect(() => {
        if (itemToEdit) {
            setName(itemToEdit.name);
            setType(itemToEdit.type);
            setDate(itemToEdit.promised_return_date ? itemToEdit.promised_return_date.split('T')[0] : '');
            setIsArchived(itemToEdit.is_archived);
        } else {
            setName('');
            setType('borrowing');
            setDate('');
            setIsArchived(false);
        }
    }, [itemToEdit, isOpen]);

    if (!isOpen) return null;

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user.id) return;
        setLoading(true); setError(null);

        const payload = {
            name, type, is_archived: isArchived, user_id: session.user.id,
            promised_return_date: date || null,
        };

        try {
            if (itemToEdit) {
                const { error } = await supabase.from('items').update(payload).eq('id', itemToEdit.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('items').insert([payload]);
                if (error) throw error;
            }
            window.dispatchEvent(new Event('itemSaved'));

            onClose();
        } catch (err: any) { setError(err.message); } finally { setLoading(false); }
    };

    const handleDelete = async () => {
        if (!itemToEdit || !window.confirm("Are you sure you want to delete this completely?")) return;
        setLoading(true);
        try {
            const { error } = await supabase.from('items').delete().eq('id', itemToEdit.id);
            if (error) throw error;
            window.dispatchEvent(new Event('itemSaved'));

            onClose();
        } catch (err: any) { setError(err.message); } finally { setLoading(false); }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex justify-center items-end md:items-center p-4 pb-[100px] md:pb-4">
            <div className="w-full max-w-sm bg-forebackground p-6 rounded-[32px] border-2 border-menu shadow-2xl relative">
                <button onClick={onClose} className="absolute top-4 right-6 text-main font-headings text-[26px]">Close</button>

                <h2 className="font-branding text-[32px] text-foreground mb-6">
                    {itemToEdit ? 'Edit Stuff' : 'Add Stuff'}
                </h2>

                <form onSubmit={handleSave} className="flex flex-col gap-4">
                    <input
                        type="text" required placeholder="What is it?" value={name} onChange={e => setName(e.target.value)}
                        className="w-full bg-background text-forebackground placeholder-forebackground/50 px-5 py-3 rounded-full font-body text-[26px] focus:outline-none focus:ring-2 focus:ring-menu"
                    />

                    <div className="flex justify-around items-center bg-background/20 rounded-full py-2">
                        <label className="flex items-center gap-2 font-headings text-[26px] text-foreground cursor-pointer">
                            <input type="radio" value="borrowing" checked={type === 'borrowing'} onChange={() => setType('borrowing')} className="w-5 h-5 accent-menu" />
                            Borrowing
                        </label>
                        <label className="flex items-center gap-2 font-headings text-[26px] text-foreground cursor-pointer">
                            <input type="radio" value="lending" checked={type === 'lending'} onChange={() => setType('lending')} className="w-5 h-5 accent-menu" />
                            Lending
                        </label>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-headings text-[22px] text-foreground pl-2">{type === 'borrowing' ? 'To Return On:' : 'Get Back On:'}</label>
                        <input
                            type="date" value={date} onChange={e => setDate(e.target.value)}
                            className="w-full bg-background text-forebackground font-body text-[26px] px-5 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-menu uppercase block"
                        />
                    </div>

                    {itemToEdit && (
                        <label className="flex items-center justify-center gap-2 font-headings text-[26px] text-foreground cursor-pointer mt-2 bg-menu/20 py-2 rounded-full border border-menu/50">
                            <input type="checkbox" checked={isArchived} onChange={e => setIsArchived(e.target.checked)} className="w-5 h-5 accent-menu" />
                            Archive / Returned
                        </label>
                    )}

                    {error && <p className="text-main font-body text-[22px] text-center">{error}</p>}

                    <div className="flex gap-2 mt-2">
                        {itemToEdit && (
                            <button type="button" onClick={handleDelete} disabled={loading} className="w-1/3 bg-main text-foreground py-3 rounded-full font-headings text-[26px] hover:opacity-90 transition">
                                Delete
                            </button>
                        )}
                        <button type="submit" disabled={loading} className="flex-1 bg-menu text-foreground py-3 rounded-full font-headings text-[26px] hover:opacity-90 transition shadow-md">
                            <span className="inline-block mt-2">{loading ? 'Saving...' : 'Save'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

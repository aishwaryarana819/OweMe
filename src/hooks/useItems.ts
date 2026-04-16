import { useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../contexts/AuthContext';
import type { Database } from '../types/database.types';

export type Item = Database['public']['Tables']['items']['Row'];

export function useItems() {
    const { session } = useAuth();
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        if (!session?.user.id) return;

        fetchItems();

        // --> Listen for our local React Native-style event! <--
        const handleLocalSave = () => fetchItems();
        window.addEventListener('itemSaved', handleLocalSave);

        const channel = supabase
            .channel('schema-db-changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'items', filter: `user_id=eq.${session.user.id}` },
                () => {
                    fetchItems();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
            // --> Clean up our listener! <--
            window.removeEventListener('itemSaved', handleLocalSave);
        };
    }, [session?.user.id]);

    async function fetchItems() {
        try {
            setLoading(true);

            const { data, error } = await supabase
                .from('items')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setItems(data || []);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    const getActiveItems = (type?: 'borrowing' | 'lending') => {
        let filtered = items.filter(item => !item.is_archived);
        if (type) filtered = filtered.filter(item => item.type === type);
        return filtered;
    };

    const getArchivedItems = (type?: 'borrowing' | 'lending') => {
        let filtered = items.filter(item => item.is_archived);
        if (type) filtered = filtered.filter(item => item.type === type);
        return filtered;
    };

    return { items, loading, error, getActiveItems, getArchivedItems, fetchItems };
}

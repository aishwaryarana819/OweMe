import React, { useState } from 'react';
import { Navigate, Outlet, useOutletContext } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import BottomNav from './BottomNav';
import ItemModal from './ItemModal';
import type { Item } from '../hooks/useItems';

export type ModalContextType = { openModal: (item?: Item) => void; };

export function useItemModal() {
    return useOutletContext<ModalContextType>();
}

export default function ProtectedRoute() {
    const { session } = useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<Item | null>(null);

    if (!session) return <Navigate to="/login" replace />;

    const openModal = (item?: Item) => {
        setItemToEdit(item || null);
        setModalOpen(true);
    };

    return (
        <>
            <div className="flex flex-col items-center p-4 relative min-h-screen pb-32">
                <Outlet context={{ openModal }} />
            </div>
            <BottomNav onAddClick={() => openModal()} />
            <ItemModal isOpen={modalOpen} onClose={() => setModalOpen(false)} itemToEdit={itemToEdit} />
        </>
    );
}

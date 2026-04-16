import React from 'react';
import Logo from '../components/Logo';
import { useItemModal } from '../components/ProtectedRoute';
import ListContainer from '../components/ListContainer';
import { useItems, type Item } from '../hooks/useItems';

export default function Home() {
    const { getActiveItems, loading } = useItems();
    const activeItems = getActiveItems(); // Gets BOTH borrowings and lendings

    const { openModal } = useItemModal();
    const handleItemClick = (item: Item) => {
        openModal(item);
    };

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-lg">
                <Logo />
                {loading ? (
                    <p className="mt-20 text-center font-body text-[26px] text-menu">Loading stuff...</p>
                ) : (
                    <ListContainer
                        title="Active Stuff"
                        items={activeItems}
                        isArchivedView={false}
                        showArchiveToggle={false}
                        onItemClick={handleItemClick}
                    />
                )}
            </div>
        </div>
    );
}

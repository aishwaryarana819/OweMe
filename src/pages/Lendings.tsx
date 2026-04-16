import React, { useState } from 'react';
import Logo from '../components/Logo';
import { useItemModal } from '../components/ProtectedRoute';
import ListContainer from '../components/ListContainer';
import { useItems, type Item } from '../hooks/useItems';

export default function Lendings() {
    const { getActiveItems, getArchivedItems, loading } = useItems();
    const [isArchivedView, setIsArchivedView] = useState(false);

    const activeItems = getActiveItems('lending');
    const archivedItems = getArchivedItems('lending');
    const currentItems = isArchivedView ? archivedItems : activeItems;

    const { openModal } = useItemModal();
    const handleItemClick = (item: Item) => {
        openModal(item);
    };

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-lg">
                <Logo />
                {loading ? (
                    <p className="mt-20 text-center font-body text-[26px] text-menu">Loading lendings...</p>
                ) : (
                    <ListContainer
                        title={isArchivedView ? "Archived Lendings" : "Lendings"}
                        items={currentItems}
                        isArchivedView={isArchivedView}
                        showArchiveToggle={true}
                        onToggleArchive={() => setIsArchivedView(!isArchivedView)}
                        onItemClick={handleItemClick}
                    />
                )}
            </div>
        </div>
    );
}

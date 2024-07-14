import React, { useEffect, useState } from 'react';

import { Categories } from '@/Pages/Catalog';

interface SideMenuProps {
    categories: Categories;
    filters: SelectedFilters;
    onFilterChange: (filters: SelectedFilters) => void;
}

export type SelectedFilters = {
    authors: number[];
    genres: number[];
};

const SideMenu: React.FC<SideMenuProps> = ({
    categories,
    filters,
    onFilterChange,
}) => {
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
        authors: filters.authors || [],
        genres: filters.genres || [],
    });

    useEffect(() => {
        setSelectedFilters({
            authors: filters.authors || [],
            genres: filters.genres || [],
        });
    }, [filters]);

    const handleCheckboxChange = (
        category: keyof SelectedFilters,
        itemId: number,
    ) => {
        setSelectedFilters((prevFilters) => {
            const updatedCategory = prevFilters[category].includes(itemId)
                ? prevFilters[category].filter((id) => id !== itemId)
                : [...prevFilters[category], itemId];

            const updatedFilters = {
                ...prevFilters,
                [category]: updatedCategory,
            };
            onFilterChange(updatedFilters);
            return updatedFilters;
        });
    };

    const isChecked = (categoryName: string, itemId: number) => {
        const result =
            selectedFilters[categoryName as keyof SelectedFilters].includes(
                itemId,
            );

        return result;
    };

    return (
        <div className="side-menu">
            {Object.entries(categories).map(([categoryName, items]) => (
                <div key={categoryName}>
                    <h3 className="my-2 text-lg font-bold uppercase">
                        {categoryName}
                    </h3>
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="w-fit rounded-sm p-2 hover:bg-sky-300"
                        >
                            <input
                                id={item.name + item.id}
                                className="mr-1 cursor-pointer"
                                type="checkbox"
                                name={item.name}
                                checked={isChecked(
                                    categoryName as keyof SelectedFilters,
                                    item.id,
                                )}
                                onChange={() =>
                                    handleCheckboxChange(
                                        categoryName as keyof SelectedFilters,
                                        item.id,
                                    )
                                }
                            />
                            <label
                                className="cursor-pointer"
                                htmlFor={item.name + item.id}
                            >
                                {item.name}
                            </label>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default SideMenu;

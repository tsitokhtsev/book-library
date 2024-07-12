import { Categories } from '@/Pages/Catalog';

interface SideMenuProps {
    categories: Categories;
}

const SideMenu: React.FC<SideMenuProps> = ({ categories }) => {
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

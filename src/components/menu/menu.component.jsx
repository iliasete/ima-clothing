import './menu.component.scss';

import CategoryItem from '../category-item/category-item.component.jsx';

const Menu = ({ categories }) => {
    return (
        <div className="menu-container">
            {categories.map((category) => {
                return <CategoryItem key={category.id} category={category} />;
            })}
        </div>
    );
};

export default Menu;

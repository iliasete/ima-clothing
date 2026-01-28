import './menu.component.scss';

import DirectoryItem from '../directory-item/directory-item.component.jsx';

const Menu = ({ categories }) => {
    return (
        <div className="menu-container">
            {categories.map((category) => {
                return <DirectoryItem key={category.id} category={category} />;
            })}
        </div>
    );
};

export default Menu;

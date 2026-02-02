import ProductCard from '../product-card/product-card.component';

import {
    CategoryPreviewContainer,
    CategoryPreviewTitle,
    CategoryPreviewItem,
} from './category-preview.style';

const CategoryPreview = ({ title, products }) => {
    return (
        <CategoryPreviewContainer>
            <h2>
                <CategoryPreviewTitle to={title}>
                    {title.toUpperCase()}
                </CategoryPreviewTitle>
            </h2>
            <CategoryPreviewItem>
                {products
                    .filter((_, idx) => idx < 4)
                    .map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </CategoryPreviewItem>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;

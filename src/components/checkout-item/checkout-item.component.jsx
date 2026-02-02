import {
    CheckoutItemContainer,
    CheckoutImageContainer,
    CheckoutImage,
    CheckoutItemField,
    CheckoutQuantity,
    CheckoutArrow,
    CheckoutValue,
    RemoveButton,
} from './checkout-item.styles';

import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { clearItemFromCart, addItemToCart, removeItemToCart } =
        useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemToCart(cartItem);

    return (
        <CheckoutItemContainer>
            <CheckoutImageContainer>
                <CheckoutImage src={imageUrl} alt={`${name}`} />
            </CheckoutImageContainer>

            <CheckoutItemField>{name}</CheckoutItemField>
            <CheckoutQuantity>
                <CheckoutArrow onClick={removeItemHandler}>
                    &#10094;
                </CheckoutArrow>
                <CheckoutValue>{quantity}</CheckoutValue>
                <CheckoutArrow onClick={addItemHandler}>&#10095;</CheckoutArrow>
            </CheckoutQuantity>
            <CheckoutItemField>{price}</CheckoutItemField>

            <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;

import { createContext, useState, useEffect } from 'react';

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (item) => item.id === productToAdd.id
    );
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    } else {
        const newCartItem = { ...productToAdd, quantity: 1 };
        cartItems = [...cartItems, newCartItem];
    }

    return cartItems;
};

const removeCartItem = (cartItems, productToRemove) => {
    const cartItem = cartItems.find((item) => item.id === productToRemove.id);

    if (cartItem.quantity === 1) {
        return cartItems.filter((product) => product.id !== productToRemove.id);
    }

    return cartItems.map((cartItem) =>
        cartItem.id === productToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

const clearCartItem = (cartItems, productToClear) =>
    cartItems.filter((product) => product.id !== productToClear.id);

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemToCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    totalCart: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce(
            (cartElements, product) => cartElements + product.quantity,
            0
        );

        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        const newCartTotal = cartItems.reduce(
            (cartTotal, product) =>
                cartTotal + product.quantity * product.price,
            0
        );

        setCartTotal(newCartTotal);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemToCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    };

    const clearItemFromCart = (productToClear) => {
        setCartItems(clearCartItem(cartItems, productToClear));
    };

    const value = {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        addItemToCart,
        removeItemToCart,
        clearItemFromCart,
        cartCount,
        cartTotal,
    };

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
};

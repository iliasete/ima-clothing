import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (item) => item.id === productToAdd.id,
    );
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem,
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
            : cartItem,
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

export const CART_ACTION_TYPES = {
    TOGGLE_CART_OPEN: 'TOOGLE_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
};

export const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            };
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
};

export const CartProvider = ({ children }) => {
    const [payload, dispatch] = useReducer(cartReducer, INITIAL_STATE);
    const { isCartOpen, cartItems, cartCount, cartTotal } = payload;

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce(
            (cartElements, product) => cartElements + product.quantity,
            0,
        );

        const newCartTotal = newCartItems.reduce(
            (cartTotal, product) =>
                cartTotal + product.quantity * product.price,
            0,
        );

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount,
            }),
        );
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    };

    const removeItemToCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemFromCart = (productToClear) => {
        const newCartItems = clearCartItem(cartItems, productToClear);
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (cartState) =>
        dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, cartState));

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

import { createContext, useContext, useState } from 'react';
import PropTypes from "prop-types";

const CartContext = createContext(undefined);

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    CartProvider.propTypes = {
        children: PropTypes.node.isRequired,
    };
    // Add item to cart
    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const itemExists = prevItems.find(item => item.productId === product.productId);
            if (itemExists) {
                return prevItems.map(item =>
                    item.productId === product.productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.productId !== productId));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    // Get the total number of items in the cart
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotalItems, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

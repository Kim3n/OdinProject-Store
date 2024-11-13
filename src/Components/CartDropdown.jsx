import {useEffect, useRef, useState} from "react";
import {useCart} from "./CartProdiver.jsx";
import {useNavigate} from "react-router-dom";
import { FaTrash, FaShoppingCart, FaCashRegister  } from "react-icons/fa";

function CartDropdown() {
    const { cartItems, removeFromCart, getTotalItems } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    // Toggle dropdown visibility
    const toggleDropdown = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleRemoveClick = (e, productId) => {
        e.stopPropagation(); // Prevent the click event from propagating to the dropdown
        removeFromCart(productId); // Remove item from cart
    };

    // Navigate to the checkout page
    const goToCheckout = () => {
        navigate("/checkout");
        setIsOpen(!isOpen);
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="w-full flex items-center text-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-600 hover:bg-gray-700">
            <FaShoppingCart className="mr-3"></FaShoppingCart> {getTotalItems()}
            </button>

            {isOpen && (
                <div ref={dropdownRef} className="absolute top-12 right-0 bg-white shadow-lg w-72 rounded-lg p-4 z-50 ">
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        <>
                            <ul className="max-h-60 w-full overflow-y-scroll scrollbar overflow-x-hidden">
                                {cartItems.map((item) => (
                                    <li key={`${item.productId}-${item.quantity}`}
                                        className="flex justify-between items-center mb-2 py-2 border-b border-gray-300">

                                        <div className="flex items-center mt-3">
                                            <img
                                                className="h-12 max-w-8 mr-3 object-contain object-center"
                                                src={item.image}
                                                alt={item.title}
                                            />

                                            <strong className="hover:text-gray-600 cursor-pointer"
                                                    onClick={() => handleProductClick(item.productId)}>{item.title}</strong> x{item.quantity}
                                            <button
                                                onClick={(e) => handleRemoveClick(e, item.productId)}
                                                className="ml-3 mr-3 text-red-500 hover:text-red-700">
                                                <FaTrash></FaTrash>
                                            </button>
                                        </div>

                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4 pt-2 text-lg font-semibold">
                                Total: {parseFloat(cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2))} KR
                            </div>
                            <div className="mt-4">
                                <button
                                    onClick={goToCheckout}
                                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 w-full flex items-center text-center justify-center border border-transparent  shadow-sm text-base font-medium"
                                >
                                    <FaCashRegister className="mr-3"> </FaCashRegister>Checkout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
}

export default CartDropdown;

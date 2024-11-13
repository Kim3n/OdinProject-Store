import { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import CartDropdown from './CartDropdown.jsx';
import {useCart} from "./CartProdiver.jsx";

function NavBar() {

    const {getTotalItems } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Navigate to the checkout page
    const goToCheckout = () => {
        navigate("/checkout");
        toggleMenu();
    };

    return (
        <nav className="bg-gray-800 z-40 w-full px-6 py-4 flex justify-between items-center relative">
            {/* Logo Section */}
            <div className="flex items-center">
                <Link to="/" className="text-3xl text-white font-semibold">
                    STORE NAME
                </Link>
            </div>

            {/* Desktop Links & Cart Button */}
            <div className="hidden lg:flex lg:items-center lg:space-x-6 ml-auto">
                <div>
                    <Link to="/products" className="text-white hover:text-gray-300">
                        Products
                    </Link>
                </div>
                <div>
                    <Link to="/contact" className="text-white hover:text-gray-300">
                        Contact
                    </Link>
                </div>

                {/* Cart Button (Desktop) */}
                <div className="ml-8">
                    <CartDropdown />
                </div>
            </div>

            {/* Hamburger Icon for Small Screens */}
            <div className="lg:hidden flex items-center">
                <button
                    onClick={toggleMenu}
                    className="text-3xl text-white"
                >
                    ☰
                </button>
            </div>

            {isMenuOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90 flex flex-col items-center justify-center z-50">

                    <button
                        onClick={toggleMenu}
                        className="absolute top-6 left-6 text-3xl text-white"
                    >
                        ×
                    </button>

                    {/* Logo (Centered) */}
                    <div className="text-3xl text-white font-semibold my-8">
                        STORE NAME
                    </div>


                    <div className="flex flex-col items-center space-y-6">
                        <Link to="/products" className="text-white text-2xl hover:text-gray-300" onClick={toggleMenu}>
                            Products
                        </Link>
                        <Link to="/contact" className="text-white text-2xl hover:text-gray-300" onClick={toggleMenu}>
                            Contact
                        </Link>
                    </div>

                    <div className="mt-8">
                        <button
                            onClick={goToCheckout}
                            className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-600 hover:bg-gray-700">

                            Cart ({getTotalItems()})
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
}

export default NavBar;

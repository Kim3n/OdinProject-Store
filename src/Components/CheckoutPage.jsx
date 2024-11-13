
import {useCart} from "./CartProdiver.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import { FaTrash, FaCashRegister  } from "react-icons/fa";

function CheckoutPage() {
    const { cartItems, clearCart, removeFromCart } = useCart();
    const [purchaseComplete, setPurchaseComplete] = useState(false);
    const navigate = useNavigate();

    const handlePurchase = () => {
        clearCart();
        setPurchaseComplete(true);
    };

    if (purchaseComplete) {
        return (
            <div className="p-6 flex flex-col justify-center items-center">
                <h2 className="text-2xl font-semibold mb-4">Purchase Complete!</h2>
                <p>Thank you for your order. Your purchase has been successfully completed.</p>
            </div>
        );
    }

    if (cartItems.length === 0) {
        return (
            <div className="p-6 flex justify-center content-center">
                <h2>Your cart is empty. Please add items to your cart.</h2>
            </div>
        );
    }

    const handleRemoveClick = (e, productId) => {
        removeFromCart(productId);
    };

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="p-6 flex justify-center mt-10">
            <div className="flex flex-col w-2/3 ">
            <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
            <div>
                <h3 className="text-xl">Your Cart:</h3>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.productId} className="flex justify-between mb-2 items-center ">
                            <div className="flex items-center mt-3">
                                <img
                                    className="h-10 mr-3 object-contain mix-blend-multiply object-center"
                                    src={item.imageUrl}
                                    alt={item.title}
                                />
                                <strong onClick={() => handleProductClick(item.productId)}
                                        className="hover:text-gray-600 cursor-pointer">{item.title}</strong> x{item.quantity}
                            </div>
                            <div className="flex-row flex gap-4 items-center">
                                <div>{item.price * item.quantity} KR</div>
                                <button
                                    onClick={(e) => handleRemoveClick(e, item.productId)}
                                    className="ml-3 mr-3 text-red-500 hover:text-red-700">
                                    <FaTrash></FaTrash>
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
                <div className="mt-4 border-t pt-2 text-lg font-semibold">
                    Total: {parseFloat(cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2))} KR

                </div>
                <div className="mt-4 flex justify-center content-center items-center">
                    <button
                        onClick={handlePurchase}
                        className="bg-green-500 text-white py-2 px-4 rounded-lg w-2/4 hover:bg-green-600 flex items-center text-center justify-center border border-transparent  shadow-sm text-base font-medium"
                    >
                        <FaCashRegister className="mr-3"> </FaCashRegister>Complete Purchase
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
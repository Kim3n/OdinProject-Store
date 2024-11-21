
import { useNavigate } from 'react-router-dom';
import { useCart } from "./CartProdiver.jsx";

import {toast} from "react-toastify";
import PropTypes from "prop-types";

function ProductCard({ image, title, description, price, productId}) {
    const { addToCart } = useCart();
    const navigate = useNavigate();

    ProductCard.propTypes = {
        image: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.number.isRequired,
        productId: PropTypes.number.isRequired,
    };


    function goToProduct() {
        console.log(productId);
        navigate(`/product/${productId}`);
    }

    // Function to handle adding product to the cart
    const handleAddToCart = (e, product) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        toast.success(<div>{product.title} has been added to your cart!</div>, {
            autoClose: 1000,
        });
    };
    return (
        <>

            <div className="w-64 mx-auto overflow-hidden bg-white rounded-lg border-2 border-transparent shadow-md duration-300 hover:scale-105 hover:shadow-xl hover:border-solid hover:border-2 hover:border-black" onClick={goToProduct}>
                <div className="relative">

                    <img
                        className="h-48 w-full object-contain mix-blend-multiply object-center"
                        src={image}
                        alt={title}
                    />
                    {
                        //Could have a boolean in API for sales to dynamically show sale ribbon but doing it simple way now
                        price < 50 &&
                        <div className="absolute top-0 right-0">
                            <div className="w-32 h-8 absolute top-4 -right-8">
                                <div
                                    className="h-full w-full bg-red-500 text-white text-center leading-8 font-semibold transform rotate-45">
                                    SALE
                                </div>
                            </div>
                        </div>

                    }

                </div>

                {/* Product Details */}
                <div className="p-4 flex flex-1 flex-col bg-gray-50 justify-between items-center text-center">
                    <h2 className="text-lg font-semibold truncate w-full">{title}</h2>
                    <h2 className="text-md text-gray-700">{price} KR</h2>
                    <button
                        onClick={(e) => handleAddToCart(e, {title, description, price, image, productId})}
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-600 hover:bg-gray-700"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

        </>
    );
}

export default ProductCard;


import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import NavBar from "./Components/NavBar.jsx";
import ProductContainer from "./Components/ProductContainer.jsx";
import {CartProvider} from "./Components/CartProdiver.jsx";
import ProductPage from "./Components/ProductPage.jsx";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import CheckoutPage from "./Components/CheckoutPage.jsx";
import {useEffect} from "react";



function App() {

    function Home() {
        return <h2 className="text-center mt-10 text-3xl">Store Home Page</h2>;
    }

    function Products() {
        return (
            <>
                <h2 className="text-center mt-10 text-3xl ">Products Page</h2>
                <ProductContainer/>
            </>
        );
    }

    function Contact() {
        return <h2 className="text-center mt-10 text-3xl">Contact Page</h2>;
    }

    function TitleUpdater() {
        const location = useLocation();

        useEffect(() => {
            const routeTitles = {
                "/": "Home  - Store Name",
                "/products": "Products  - Store Name",
                "/contact": "Contact Us  - Store Name",
                "/checkout": "Checkout - Store Name",
            };

            const originalTitle = routeTitles[location.pathname] || "Store Name";

            const productMatch = location.pathname.match(/^\/product\/\d+$/);
            if (productMatch) {
                document.title = "Product Details  - Store Name";
            } else {
                document.title = originalTitle;
            }


            const handleVisibilityChange = () => {
                if (document.hidden) {
                    document.title = "Store Name";
                } else {
                    document.title = productMatch
                        ? "Product Details  - Store Name"
                        : originalTitle;
                }
            };

            document.addEventListener("visibilitychange", handleVisibilityChange);

            return () => {
                document.removeEventListener("visibilitychange", handleVisibilityChange);
            };
        }, [location.pathname]);

        return null;
    }

    return (
        <CartProvider>
            <Router>
                <div className="m-0 p-0">
                    <TitleUpdater />
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route
                            path="/Products"
                            element={<Products />}
                        />
                        <Route path="/contact" element={<Contact/>}/>
                        <Route path="/product/:id" element={<ProductPage/>}/>
                        <Route path="/checkout" element={<CheckoutPage />} />

                    </Routes>
                    <ToastContainer
                        position="bottom-center"
                        autoClose={3000}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored" // Apply colored theme for small toasts
                        className="toast-container" // Custom class if you want to add more custom styles
                    />
                </div>
            </Router>
        </CartProvider>
    )
}

export default App

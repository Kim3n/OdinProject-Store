
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from "./Components/NavBar.jsx";
import ProductContainer from "./Components/ProductContainer.jsx";
import {CartProvider} from "./Components/CartProdiver.jsx";
import ProductPage from "./Components/ProductPage.jsx";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import CheckoutPage from "./Components/CheckoutPage.jsx";



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

    return (
        <CartProvider>
            <Router>
                <div className="m-0 p-0">
                    <NavBar c/>
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

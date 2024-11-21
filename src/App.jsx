
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import NavBar from "./Components/NavBar.jsx";
import ProductContainer from "./Components/ProductContainer.jsx";
import {CartProvider} from "./Components/CartProdiver.jsx";
import ProductPage from "./Components/ProductPage.jsx";
import { ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import CheckoutPage from "./Components/CheckoutPage.jsx";
import {TitleUpdater} from "./Components/TitleUpdater.jsx";
import HomePage from "./Components/HomePage.jsx";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from "./Components/Footer.jsx";
import ContactUs from "./Components/ContactUs.jsx";




function App() {

    function Home() {
        return  <>
        <HomePage/>
    </>

    }

    function Products() {
        return (
            <>
                <ProductContainer/>
            </>
        );
    }

    function Contact() {
        return <ContactUs></ContactUs>
    }


    return (
        <CartProvider>
            <Router>
                <div className="min-h-screen flex flex-col">
                    <div className="m-0 p-0 flex-1 flex flex-col">
                        <TitleUpdater></TitleUpdater>
                        <NavBar/>
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route
                                path="/Products"
                                element={<Products/>}
                            />
                            <Route path="/contact" element={<Contact/>}/>
                            <Route path="/product/:id" element={<ProductPage/>}/>
                            <Route path="/checkout" element={<CheckoutPage/>}/>

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
                    <Footer/>
                </div>
            </Router>
        </CartProvider>
)
}

export default App

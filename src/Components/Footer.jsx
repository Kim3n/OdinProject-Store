import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <footer
            className="flex w-full flex-col flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-bg-gray-800 bg-gray-800 py-6 text-center md:justify-between z-10">
            <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 justify-center md:justify-start">

                <li>
                    <Link to="/"

                          className="text-white hover:text-gray-300">

                        Store Name
                    </Link>
                </li>
                <li>
                    <Link to="/products"
                          className="text-white hover:text-gray-300">
                        Products
                    </Link>
                </li>
                <li>
                    <Link to="/contact" className="text-white hover:text-gray-300">
                        Contact Us
                    </Link>
                </li>
            </ul>
            <p className="text-white hover:text-gray-300">
                <a href="https://github.com/Kim3n/OdinProject-Store">Made by Kim3n</a>
            </p>
        </footer>
    );
}
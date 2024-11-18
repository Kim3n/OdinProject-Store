import {useLocation} from 'react-router-dom';
import {useEffect} from 'react';

function handleVisibilityChange(originalTitle, title) {
    const visibilityHandler = () => {
        if (document.hidden) {
            document.title = originalTitle;
        } else {
            document.title = title;
        }
    };

    document.addEventListener('visibilitychange', visibilityHandler);


    return () => {
        document.removeEventListener('visibilitychange', visibilityHandler);
        document.title = originalTitle;
    };
}

function TitleUpdater() {
    const location = useLocation();

    useEffect(() => {
        const routeTitles = {
            "/": "Home - Store Name",
            "/products": "Products - Store Name",
            "/contact": "Contact Us - Store Name",
            "/checkout": "Checkout - Store Name",
        };

        let title = routeTitles[location.pathname] || 'Store Name';
        const originalTitle = document.title;

        document.title = title;

        return handleVisibilityChange(originalTitle, title);
    }, [location.pathname]);

    return null;
}

function useProductTitle(product) {
    useEffect(() => {
        if (product) {
            const originalTitle = document.title;

            const title = `${product.title} - Store Name`;
            document.title = title;

            return handleVisibilityChange(originalTitle, title);
        }
    }, [product]);

}

export { TitleUpdater, useProductTitle };

import Slider from "react-slick";
import ProductCard from "./ProductCard";
import PropTypes from 'prop-types';



function CardCarousel({ products }) {
    function NextArrow(props) {
        const { className, style, onClick } = props;
        return (

        <div className={className}
             style={{...style, display: "block"}}
             onClick={onClick}
        >
            <div className="next-slick-arrow">
                <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960" width="24">
                    <path
                        d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/>
                </svg>
            </div>
        </div>
    )
        ;
    }

    function PrevArrow(props) {
        const { className, style, onClick } = props;
        return (

            <div className={className}
                 style={{...style}}
                 onClick={onClick}>
                <div className="next-slick-arrow rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" stroke="black" height="24" viewBox="0 -960 960 960"
                         width="24">
                        <path
                            d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z"/>
                    </svg>
                </div>
            </div>
        );
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        prevArrow: <PrevArrow/>,
        nextArrow: <NextArrow/>,
        autoplay: true,
        responsive: [
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 1,
                    speed: 500,

                },
            },
            {
                breakpoint: 1150,
                settings: {
                    slidesToShow: 2,

                },
            },
            {
                breakpoint: 1300,
                settings: {
                    slidesToShow: 3,

                },
            },
        ],
    };

    CardCarousel.propTypes = {
        products: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
                title: PropTypes.string.isRequired,
                price: PropTypes.number.isRequired,
                description: PropTypes.string,
                category: PropTypes.string,
            })
        ).isRequired,
    };

    NextArrow.propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        onClick: PropTypes.func,
    };

    PrevArrow.propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        onClick: PropTypes.func,
    };


    return (
        <div className="w-3/6 mx-auto px-4 py-8 mb-6 ">
            <Slider {...settings}>
                {products.map((product) => (
                    <div key={product.id} className="p-4">
                        <ProductCard productId={product.id} {...product} />
                    </div>
                ))}
            </Slider>

        </div>
    );
}

export default CardCarousel;

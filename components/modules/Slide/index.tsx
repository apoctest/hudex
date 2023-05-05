import Slider from "react-slick"
import slides from "./slides.json"

export default function Slide() {

    const SliderSettings = {
        dots: false,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 978,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
        ]               
    }

    return (
        <Slider {...SliderSettings}>
            {slides["slides"].map((item, index) => (
                <div key={"slide-" + index} className="slides" >
                    <img className="slides-img" src={item.image} />
                </div>
            ))}
        </Slider>
    )
}


import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Categorys = () => {
  const { categorys } = useSelector((state) => state.home);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 10,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 8,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 5,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 3,
    },
  };

  return (
    <>
      <h2 className="text-2xl font-semibold text-center mb-5 text-gray-800">
        Browse Categories
      </h2>
      
      <div className="bg-gray-200 w-10/12 py-4 rounded-md px-2 md:px-4 mx-auto max-w-screen-lg"> 
        <Carousel
          autoPlay={true}
          infinite={true}
          arrows={false}
          responsive={responsive}
          transitionDuration={500}
        >
          {categorys.map((c, i) => (
            <Link
              key={i}
              to={`/products?category=${c.name}`}
              className="flex flex-col items-center w-full h-full mx-2"
            >
              <div className="flex flex-col items-center bg-white rounded-md shadow-md p-2 h-28 w-24 flex-grow">
                <img
                  src={c.image}
                  alt={c.name}
                  className="w-16 h-16 object-cover mb-1" 
                />
                <span className="text-sm md:text-md font-semibold text-gray-800 text-center">
                  {c.name}
                </span>
              </div>
            </Link>
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default Categorys;
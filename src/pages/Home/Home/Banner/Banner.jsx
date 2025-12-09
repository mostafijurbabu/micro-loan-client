import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../../assets/loanimg4.jpg";
import bannerImg2 from "../../../../assets/loanimg9.jpg";
import bannerImg3 from "../../../../assets/loanimg10.jpg";

const Banner = () => {
  return (
    <Carousel autoPlay={true} infiniteLoop={true} interval={3000}>
      <div className="relative">
        <img className="rounded-xl" src={bannerImg1} />
        <button
          className="absolute 
                       bottom-10 
                       left-1/2 
                       -translate-x-1/2 
                       bg-primary 
                       text-black
                       font-bold
                       text-xl 
                       w-1/2 
                       py-3 
                       rounded-lg 
                       hover:bg-blue-700 
                       transition"
        >
          Explore Loans
        </button>
      </div>
      <div>
        <img className="rounded-xl" src={bannerImg2} />

        <button
          className="absolute 
                       bottom-10 
                       left-1/2 
                       -translate-x-1/2 
                       bg-primary 
                       text-black
                       font-bold
                       text-xl 
                       w-1/2 
                       py-3 
                       rounded-lg 
                       hover:bg-blue-700 
                       transition"
        >
          Explore Loans
        </button>
      </div>
      <div>
        <img className="rounded-xl" src={bannerImg3} />

        <button
          className="absolute 
                       bottom-10 
                       left-1/2 
                       -translate-x-1/2 
                       bg-primary 
                       text-black
                       font-bold
                       text-xl 
                       w-1/2 
                       py-3 
                       rounded-lg 
                       hover:bg-blue-700 
                       transition"
        >
          Explore Loans
        </button>
      </div>
    </Carousel>
  );
};

export default Banner;

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../../assets/loanimg4.jpg";
import bannerImg2 from "../../../../assets/loanimg9.jpg";
import bannerImg3 from "../../../../assets/loanimg10.jpg";

const Banner = () => {
  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      interval={3000}
      dynamicHeight={70}
    >
      <div>
        <img className="rounded-xl" src={bannerImg1} />
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img className="rounded-xl" src={bannerImg2} />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img className="rounded-xl" src={bannerImg3} />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
};

export default Banner;

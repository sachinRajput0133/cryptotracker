import { Container} from "@mui/material";
import React from "react";

import "./Banner.css";
import BannerCarousel from "./BannerCarousel";

const Banner = () => {


  return (
    <div className="banner">
      <Container className="banner-content">
        <div className="tag-wrapper">
          <div className="tag-lines">
            <span className="subtitle1">
              Crypto Tracker
            </span>
            <span className="subtitle2">
              Get all info regarding your favourit crypto
            </span>
          </div>
         <BannerCarousel/>
        </div>
      </Container>
    </div>
  );
};

export default Banner;

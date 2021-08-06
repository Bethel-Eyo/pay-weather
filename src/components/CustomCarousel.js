import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WeatherCard from "./WeatherCard";
import LeftArrow from "../assets/left-arrow.svg";
import RightArrow from "../assets/right-arrow.svg";
import "../App.css";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux";
import { SET_BARCHART_DATA } from "../types";
import { sortBarChartData } from "../actions/weather";

const useStyles = makeStyles({
  root: {
    minWidth: 205,
    marginRight: 5,
    marginLeft: 5,
    // width: 245,
  },
  selectedRoot: {
    minWidth: 205,
    marginRight: 5,
    marginLeft: 5,
    borderWidth: 5,
    borderColor: "#137cbd",
  },
});

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      src={RightArrow}
      alt="nextArrow"
      style={{ ...style, position: "absolute", right: 50, top: -50 }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <img
      src={LeftArrow}
      alt="prevArrow"
      style={{ ...style, position: "absolute", left: 50, top: -50 }}
      onClick={onClick}
    />
  );
}

const CustomCarousel = ({ data, celsius, allData }) => {
  const classes = useStyles();
  const [activeIndex, setActiveIndex] = useState(-1);
  const dispatch = useDispatch();
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024, // and below width: 800
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 768, // and below width: 800
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600, // and below width: 500
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480, // 480 below width: 300
        settings: {
          // 320 below width: 270
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const onSelected = (weather, index) => {
    setActiveIndex(index);
    dispatch(sortBarChartData(weather, allData))
  };


  return (
    <div>
      <div className="carousel-container">
        <Slider
          style={{
            paddingLeft: "2%",
            paddingRight: "2%",
          }}
          {...settings}
        >
          {data?.slice(0, 5).map((weather, index) => (
            <div
              key={index}
              onClick={() => {
                onSelected(weather, index);
              }}
            >
              <WeatherCard
                temp={Math.round(weather.main.temp)}
                date={moment(weather.dt_txt).format("MMM Do YY")}
                description={weather.weather[0].description}
                icon={weather.weather[0].icon}
                isCels={celsius}
                customStyle={
                  activeIndex === index ? classes.selectedRoot : classes.root
                }
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CustomCarousel;

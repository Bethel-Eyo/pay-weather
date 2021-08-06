import axios from "axios";
import { API_URL, APP_ID } from "../config/constants";
import { LOADING, SET_FIVE_DAYS_FORECAST, SET_WEATHER_DATA, SET_BARCHART_DATA, SET_CITY } from "../types";
import { toast } from "react-toastify";

export const getWeatherData =
  (city = "Munich,de") =>
  async (dispatch) => {
    dispatch({
      type: LOADING,
      payload: true,
    });

    dispatch({
      type: SET_CITY,
      payload: city,
    });

    await axios
      .get(API_URL + city + "&units=imperial&APPID=" + APP_ID + "&cnt=40")
      .then((res) => {
        console.log(res.data);
        dispatch({
          type: SET_WEATHER_DATA,
          payload: res.data.list,
        });
        setFiveDaysData(res.data.list, dispatch)
        // alert("Weather data gotten successfully");
      })
      .catch((error) => {
        const message = error.response.data.error;
        // alert(message);
        // clear all data in redux state
        dispatch({
          type: SET_WEATHER_DATA,
          payload: null,
        });
        dispatch({
          type: SET_FIVE_DAYS_FORECAST,
          payload: null
        });
        dispatch({
          type: SET_BARCHART_DATA,
          payload: null
        });
      })
      .finally(() => {
        dispatch({
          type: LOADING,
          payload: false,
        });
      });
  };

export const sortBarChartData = (weather, allData) => (dispatch) => {
  let chartData = [];
  let weatherDate = weather.dt_txt;
  let weatherDatePart = weatherDate.split(" ");
  allData.forEach((element) => {
    let initialDate = element.dt_txt;
    let dateParts = initialDate.split(" ");
    if (weatherDatePart[0] == dateParts[0]) {
      let time = dateParts[1].split(':')
      chartData.push({
        date: time[0] + ":00",
        temp: element.main.temp
      });
    }
  });
  dispatch({
    type: SET_BARCHART_DATA,
    payload: chartData
  });
};

const setFiveDaysData = (data, dispatch) => {
  let fiveData = [];
  let forecast = [];
  data.forEach(element => {
    let initialDate = element.dt_txt;
    let dateParts = initialDate.split(' ');
    if(fiveData.includes(dateParts[0])){
      // do nothing
    } else {
      fiveData.push(dateParts[0]);
      forecast.push(element);
    }
  });

  dispatch({
    type: SET_FIVE_DAYS_FORECAST,
    payload: forecast
  });
  console.log('five data: ' + fiveData.length);
}

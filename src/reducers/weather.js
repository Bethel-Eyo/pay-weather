import {
  SET_BARCHART_DATA,
  SET_CELSIUS,
  SET_CITY,
  SET_FIVE_DAYS_FORECAST,
  SET_WEATHER_DATA,
} from "../types";

export const initialState = {
  weatherData: null,
  fiveDaysData: null,
  isCelsius: false,
  barChartData: null,
  weatherCity: "",
};

const weatherReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_WEATHER_DATA:
      return {
        ...state,
        weatherData: payload,
      };
    case SET_FIVE_DAYS_FORECAST:
      return {
        ...state,
        fiveDaysData: payload,
      };
    case SET_CELSIUS:
      return {
        ...state,
        isCelsius: payload,
      };
    case SET_BARCHART_DATA:
      return {
        ...state,
        barChartData: payload,
      };
    case SET_CITY:
      return {
        ...state,
        weatherCity: payload,
      };
    default:
      return state;
  }
};

export default weatherReducer;

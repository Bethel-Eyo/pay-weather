import { getByTestId, render } from "@testing-library/react";
import React from "react";
import WeatherCard from "./WeatherCard";

let container = null;

const mockedWeatherCard = {
  description: "broken clouds",
  date: "2021-08-06 21:00:00",
  temp: 76.02,
  icon: "04n",
  isCels: false,
  customStyle: {
    minWidth: 205,
    marginRight: 5,
    marginLeft: 5,
  },
};

// to render the component before each test
beforeEach(() => {
  container = render(
    <WeatherCard
      temp={mockedWeatherCard.temp}
      date={mockedWeatherCard.date}
      description={mockedWeatherCard.description}
      icon={mockedWeatherCard.icon}
      isCels={mockedWeatherCard.isCels}
      customStyle={mockedWeatherCard.icon}
    />
  ).container;
});

it("should show description in card", () => {
  expect(getByTestId(container, "description").textContent).toBe("broken clouds");
});

it("should show image icon", () => {
  expect(getByTestId(container, "icon").textContent).toBeTruthy;
});

it("should show date in card", () => {
  expect(getByTestId(container, "weather-date").textContent).toBe("2021-08-06 21:00:00");
});

// main requirement in task (default farenheit)
it("should show expected weather temperature", () => {
  expect(getByTestId(container, "temperature").textContent).toBe(Math.round(76.02) + "° F");
});

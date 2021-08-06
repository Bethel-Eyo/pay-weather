import React from "react";
import { act, getByTestId } from "@testing-library/react";
import App from "./App";
import renderConnected from "./utils/renderConnected";
import * as reactRedux from "react-redux";
import { getWeatherData } from "./actions/weather";
import { mockedWeather } from "./config/constants";

const mockWeatherState = {
  weatherData: mockedWeather,
  fiveDaysData: null,
  isCelsius: false,
  barChartData: null,
  weatherCity: "",
};

const mockLoadingState = {
  isLoading: false,
};

const thunk =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      return action(dispatch, getState);
    }

    return next(action);
  };

const create = () => {
  const store = {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
  };
  const next = jest.fn();

  const invoke = (action) => thunk(store)(next)(action);

  return { store, next, invoke };
};

describe("<App />", () => {
  let wrapper;
  const initialState = {
    // ... mock data of initial testing state
    weatherData: null,
    fiveDaysData: null,
    isCelsius: false,
    barChartData: null,
    weatherCity: "",
  };
  const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
  const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

  afterEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();
  });

  beforeEach(async () => {
    useSelectorMock.mockReturnValue(mockLoadingState);
    useSelectorMock.mockReturnValue(mockWeatherState);
    useDispatchMock.mockReturnValue(jest.fn());

    const { store, invoke } = create();
    invoke((dispatch, getState) => {
      dispatch(getWeatherData('Lagos'));
      getState();
    });

    const utils = renderConnected(<App />, { initialState });
    wrapper = utils.container;
    // gives us the chance to execute the useEffect hook callback
    await act(async () => {});
  });

  test("passes dispatch and getState", () => {
    const { store, invoke } = create();
    invoke((dispatch, getState) => {
      dispatch('LOADING');
      getState();
    });
    expect(store.dispatch).toHaveBeenCalledWith('LOADING');
    expect(store.getState).toHaveBeenCalled();
  });

  it("renders the component", () => {
    expect(getByTestId(wrapper, "root")).toBeTruthy();
  });

  it("shows the 'search location' button", () => {
    expect(getByTestId(wrapper, "search-btn")).toBeTruthy();
  });

  it("shows the group of radio buttons", async () => {
    expect(getByTestId(wrapper, "radio-group")).toBeTruthy();
  });
});

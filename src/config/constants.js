export const API_URL = "https://api.openweathermap.org/data/2.5/forecast?q=";
export const APP_ID = "75f972b80e26f14fe6c920aa6a85ad57";

export const mockedWeather = [
  {
    dt: 1628283600,
    main: {
      temp: 62.02,
      feels_like: 61.41,
      temp_min: 57.47,
      temp_max: 62.02,
      pressure: 1010,
      sea_level: 1010,
      grnd_level: 950,
      humidity: 74,
      temp_kf: 2.53,
    },
    weather: [
      {
        id: 803,
        main: "Clouds",
        description: "broken clouds",
        icon: "04n",
      },
    ],
    clouds: {
      all: 61,
    },
    wind: {
      speed: 2.46,
      deg: 211,
      gust: 2.46,
    },
    visibility: 10000,
    pop: 0,
    sys: {
      pod: "n",
    },
    dt_txt: "2021-08-06 21:00:00",
  },
];

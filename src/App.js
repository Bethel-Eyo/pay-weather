import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Button,
  CircularProgress,
  Typography,
  Dialog,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { Container } from "react-bootstrap";
import CustomCarousel from "./components/CustomCarousel";
import CustomBarChart from "./components/CustomBarChart";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import { useSelector, useDispatch } from "react-redux";
import { getWeatherData, sortBarChartData } from "./actions/weather";
import { SET_CELSIUS } from "./types";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import StyledRadio from "./components/StyledRadio";
import SearchButton from "./components/SearchButton";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "85%"
    },
  },
  text: {
    margin: 5
  }
}));

const App = () => {
  const [value, setValue] = useState("farenheit");
  const [city, setCity] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);
  const { weatherData, fiveDaysData, isCelsius, barChartData, weatherCity } =
    useSelector((state) => state.weather);
  const classes = useStyles();

  // fetch weather data when the component mounts
  useEffect(() => {
    dispatch(getWeatherData());
  }, []);

  // set bar chart data to first date on the card.
  useEffect(() => {
    if (fiveDaysData != null) {
      dispatch(sortBarChartData(fiveDaysData[0], weatherData));
    }
  }, [fiveDaysData]);

  // toggle between celsius and farenheit si units
  const handleChange = (event) => {
    if (event.target.value == "farenheit") {
      dispatch({
        type: SET_CELSIUS,
        payload: false,
      });
    } else if (event.target.value == "celsius") {
      dispatch({
        type: SET_CELSIUS,
        payload: true,
      });
    }
    setValue(event.target.value);
    // console.log(weatherData);
  };

  const search = (e) => {
    // e.preventDefault();
    console.log(city);
    dispatch(getWeatherData(city));
    setOpenDialog(false);
  };

  return (
    <div data-testid="root" className="App">
      <Container className="App-container">
        {isLoading ? (
          <CircularProgress data-testid="loader" color="secondary" />
        ) : (
          <>
            {weatherData == null ? (
              <Typography variant="h6" className={classes.text}>
                Oops! Please search for a valid location.
              </Typography>
            ) : (
              <Typography variant="h6" className={classes.text}>
                Showing five(5) days weather data for {weatherCity}
              </Typography>
            )}
            <SearchButton
              onClick={() => setOpenDialog(true)}
              variant="contained"
              color="primary"
              data-testid="search-btn"
            >
              search location
            </SearchButton>
            {weatherData == null ? (
              <></>
            ) : (
              <>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="gender"
                    name="gender1"
                    value={value}
                    onChange={handleChange}
                    style={{ flexDirection: "row", marginBottom: 70 }}
                    data-testid="radio-group"
                  >
                    <FormControlLabel
                      value="farenheit"
                      control={<StyledRadio />}
                      label="Farenheit"
                    />
                    <FormControlLabel
                      value="celsius"
                      control={<StyledRadio />}
                      label="Celsius"
                    />
                  </RadioGroup>
                </FormControl>
                <CustomCarousel
                  data={fiveDaysData}
                  celsius={isCelsius}
                  allData={weatherData}
                />
                {barChartData == null ? (
                  <></>
                ) : (
                  <CustomBarChart data={barChartData} />
                )}{" "}
              </>
            )}

            <Dialog
              maxWidth="xs"
              fullWidth={true}
              open={openDialog}
              onClose={() => {
                setOpenDialog(false);
              }}
            >
              <DialogContent>
                <form
                  className={classes.root}
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    color="primary"
                    onChange={(e) => setCity(e.target.value)}
                    label="Search location"
                    variant="outlined"
                  />
                </form>
              </DialogContent>
              <DialogActions>
                <SearchButton
                  variant="contained"
                  color="primary"
                  onClick={search}
                >
                  Go
                </SearchButton>
              </DialogActions>
            </Dialog>
          </>
        )}
      </Container>
    </div>
  );
};

export default App;

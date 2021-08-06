import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "../App.css";

const useStyles = makeStyles({
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const WeatherCard = ({ description, date, temp, icon, isCels, customStyle }) => {
  const classes = useStyles();
  const [temperature, setTemperature] = useState(Math.round(temp));

  // calculate farenheit to celsius conversion on radio button switch
  useEffect(() => {
    if (isCels) {
      let tempr = Math.round(temp);
      let cels = (tempr - 30) / 2;
      setTemperature(cels);
    } else {
      setTemperature(Math.round(temp));
    }
  }, [isCels]);


  return (
    <Card className={customStyle} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          Temperature
        </Typography>
        {isCels ? (
          <Typography variant="h5" component="h2">
            {temperature}° C
          </Typography>
        ) : (
          <Typography variant="h5" component="h2" data-testid="temperature">
            {temperature}° F
          </Typography>
        )}
        <Typography className={classes.pos} color="textSecondary" data-testid="weather-date">
          {date}
        </Typography>
        <div className="info">
          <img
            className="city-icon"
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
            alt={description}
            data-testid="icon"
          />
          <Typography data-testid="description" variant="body2" component="p">
            {description}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;

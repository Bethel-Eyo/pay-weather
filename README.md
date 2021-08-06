# Description

Since we are programmers and sit inside the whole day I built an app to check the weather outside so we do not actually have to go outside to see what it's like.

## Overview

1. On launching the app, there is a loader that shows while we fectch the data.
2. Once the data is fetched, the weather data is displayed for five days for a particular location (with Munich as default)
3. Users can switch between temperature units of measurement (Farenheit and celsius)
4. Users can search for a new location by clicking on the search location button and a dialog pops up, once the user inputs the location and clicks on the go button, the weather for that location is displayed (for 5 days);
5. User can navigate horizontally (right or left) using the arrows to see the other weather cards( users can also swipe horizontally).
6. Users can click on the card(for a particular day out of the 5days) to select in and see an analytical representation(Bar charts) of the temperature compared to the times. it shows 8 different times for future dates.

## Technologies

 The Application has a responsive interface and it uses https://material-ui.com/ for drawing cards, button e.t.c and redux for state management.

## Tests
A couple of tests was added to ensure that some components were rendered('./App.test.js') and that we have the right weather temperature so we do not get soaked('./src/components/WeatherCard.test.js').

## Live Preview
This application is hosted on github pages and you can access it here http://Bethel-Eyo.github.io/pay-weather
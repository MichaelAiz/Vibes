import React, { Component } from "react";
import "./App.css";
import Intro from "./components/Intro";
import Login from "./components/Login";
import MusicWrapper from "./components/MusicWrapper";
import stormy from "../src/assets/stormy.jpg";
import rainy from "../src/assets/rainy.jpg";
import sunnycloudy from "../src/assets/sunny-cloudy.jpg";
import clear from "../src/assets/clear.jpg";
import cloudy from "../src/assets/cloudy.jpg";
import clearnight from "../src/assets/clear-night.jpg";
import cloudynight from "../src/assets/cloudy-night.jpg";
import snowy from "../src/assets/snowy.jpg";
import { HashRouter as Router, Route } from "react-router-dom"; //Hash Router is used instead of Browser Router to allow for app to be hosted on Github Pages
var Spinner = require('react-spinkit');
let location = {}; //defines location object to later store current location

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: "", //will be defined later through async methods
      time: "",
      locationAllowed: true //initially set to true to display simple loading text instead of location denied message
    };
  }

  getWeather = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${process.env.REACT_APP_WEATHER_API}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ weather: data.weather[0].description });
        //determines if day or night based on "icon" from weather API, this helps determine background image
        if (data.weather[0].icon.includes("d")) {
          this.setState({ time: "day" });
          console.log(this.state.time);
        } else {
          this.setState({ time: "night" });
          console.log(this.state.time);
        }
      });
  };

  getStyle = () => {
    //changes the background image based on the weather and time of day
    let image = "";
    if (this.state.weather.includes("clear") && this.state.time === "day") {
      image = `url('${clear}')`;
    } else if (
      this.state.weather.includes("clear") &&
      this.state.time === "night"
    ) {
      image = `url('${clearnight}')`;
    } else if (
      this.state.weather.includes("few clouds") &&
      this.state.time === "day"
    ) {
      image = `url('${sunnycloudy}')`;
    } else if (
      this.state.weather.includes("few clouds") &&
      this.state.time === "night"
    ) {
      image = `url('${cloudynight}')`;
    } else if (
      this.state.weather.includes("clouds") &&
      this.state.time === "day"
    ) {
      image = `url('${cloudy}')`;
    } else if (
      this.state.weather.includes("clouds") &&
      this.state.time === "night"
    ) {
      image = `url('${cloudynight}')`;
    } else if (
      this.state.weather.includes("thunderstorm") &&
      this.state.time === "night"
    ) {
      image = `url('${stormy}')`;
    } else if (
      this.state.weather.includes("rain") ||
      this.state.weather.includes("drizzle")
    ) {
      image = `url('${rainy}')`;
    }  else if (
      this.state.weather.includes("snow")
    ) {
      image = `url('${snowy}')`;
    }
    return {
      backgroundImage: image,
    };
  };

  getLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(function (position) {
        location.lat = position.coords.latitude;
        location.lon = position.coords.longitude;
        if (location.lon !== "") {
          //resolves if the location object is not empty, this ensures the program waits for the location call to complete
          resolve();
        }
      }, function () { 
        reject(); //rejects if there is an error with location (permission is denied)
      });
    });
  };



  render() {
    return (
      <Router>
        <div className="App" style={this.getStyle()}> 
          <Route
            exact
            path="/"
            render={(props) => (
              <React.Fragment>
                {this.state.weather ? (
                  <Intro weather={this.state.weather} /> //takes time for weather data, shows loading until it is ready
                ) : (
                  <div style={{ color: "green" }} className="loader">
                   {this.state.locationAllowed ? <Spinner name = "line-scale-pulse-out"/> : <h1 style={{ fontSize: "2rem" }}>It seems you didn't allow us to access your location, please do so. Vibes will probably not sell your information</h1> }
                  </div>
                )}
              </React.Fragment>
            )}
          />
          <Route
            path="/:access_token(access_token=.*)" //Regex is used as a workaround since using hashrouter changes the callback uri and this was the only way I could find to locate the correct route(taken from Stack Overflow)
            render={(props) => (
              <React.Fragment>
                {this.state.weather && this.state.time ? ( 
                  <MusicWrapper //loads music wrapper which extracts the access token 
                    weather={this.state.weather}
                    time={this.state.time}
                  />
                ) : (
                  <div style={{ color: "green" }} className="loader">
                    {this.state.locationAllowed ?  <Spinner name = "line-scale-pulse-out"/>: <h1 style={{ fontSize: "2rem" }}>It seems you didn't allow us to access your location, please do so. Vibes will probably not sell your information</h1> }
                  </div>
                )}
              </React.Fragment>
            )}
          />
          <Route
            path="/Login"
            render={(props) => (
              <React.Fragment>
                {this.state.weather ? (
                  <Login weather={this.state.weather} />
                ) : (
                  <div style={{ color: "green" }} className="loader">
                    <h1 style={{ fontSize: "4rem" }}>Loading Vibes</h1>
                  </div>
                )}
              </React.Fragment>
            )}
          />
        </div>
      </Router>
    );
  }
  componentDidMount() {
    this.getLocation().then(this.getWeather)
    .catch(() => {
      this.setState({locationAllowed: false})
    });
  }
}

export default App;

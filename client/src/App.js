import React, { Component } from "react";
import "./App.css";
import Intro from "./components/Intro";
import Login from "./components/Login";
import MusicWrapper from "./components/MusicWrapper";
import Loading from "./components/Loading"
import stormy from "../src/assets/stormy.jpg";
import rainy from "../src/assets/rainy.jpg";
import sunnycloudy from "../src/assets/sunny-cloudy.jpg";
import clear from "../src/assets/clear.jpg";
import cloudy from "../src/assets/cloudy.jpg";
import clearnight from "../src/assets/clear-night.jpg";
import cloudynight from "../src/assets/cloudy-night.jpg";
import { HashRouter as Router, Route} from "react-router-dom";
let location = {}; //defines location object to later store current location

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: "", //will be defined later through async methods
      time: "",
      songs: [],
    };
  }

  getWeather = () => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${process.env.REACT_APP_WEATHER_API}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ weather: data.weather[0].description });
        //determines if day or night based on "icon" from weather API
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
    }
    return {
      backgroundImage: image,
    };
  };

  getLocation = () => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(function (position) {
        location.lat = position.coords.latitude;
        location.lon = position.coords.longitude;
        if (location.lon !== "") {
          //resolves if the location object is not empty, this ensures the program waits for the location call to complete
          resolve();
        }
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
                 {this.state.weather ? <Intro weather = {this.state.weather}/> : <Loading/>}
                </React.Fragment>
              )}
            />
            <Route
              path="/:access_token(access_token=.*)"
              render={(props) => (
                <React.Fragment>
                  {this.state.weather && this.state.time ? <MusicWrapper weather = {this.state.weather} time = {this.state.time}/> : <Loading />}
                </React.Fragment>
              )}
            />
            <Route
              path="/Login"
              render={(props) => (
                <React.Fragment>
                  {this.state.weather ? <Login weather = {this.state.weather}/> : <Loading/>}
                </React.Fragment>
              )}
            />
        </div>
      </Router>
    );
  }
  componentDidMount() {
    this.getLocation().then(this.getWeather);
  }
}

export default App;

import React, { Component } from "react";
import "./App.css";
import Intro from "./components/Intro";
import stormy from "../src/assets/stormy.jpg";
import rainy from "../src/assets/rainy.jpg";
import sunnycloudy from "../src/assets/sunny-cloudy.jpg";
import clear from "../src/assets/clear.jpg";
import cloudy from "../src/assets/cloudy.jpg";
import clearnight from "../src/assets/clear-night.jpg";
import cloudynight from "../src/assets/cloudy-night.jpg";
let location = {};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: "",
      time: "",
    };
  }

  getWeather = async (lat, lon) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_WEATHER_API}`
    )
      .then((res) => res.json())
      .then((data) => {
        this.setState({ weather: data.weather[0].description });
        console.log(data);
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
    console.log(this.state.weather);
    if (this.state.weather.includes("clear") && this.state.time === "day") {
      return {
        backgroundImage: `url('${clear}')`
      };
    } else if (this.state.weather.includes("clear") && this.state.time === "night") {
      return {
        backgroundImage: `url('${clearnight}')`
      };
    } else if (this.state.weather.includes("few clouds") && this.state.time === "day") {
      return {
        backgroundImage: `url('${sunnycloudy}')`
      };
    } else if (this.state.weather.includes("few clouds") && this.state.time === "night") {
      return {
        backgroundImage: `url('${sunnycloudy}')`
      };
    } else if (this.state.weather.includes("clouds") && this.state.time === "day") {
      return {
        backgroundImage: `url('${cloudy}')`
      };
    } else if (this.state.weather.includes("clouds") && this.state.time === "night") {
      return {
        backgroundImage: `url('${cloudynight}')`
      };
    } else if (this.state.weather.includes("thunderstorm") && this.state.time === "night") {
      return {
        backgroundImage: `url('${stormy}')`
      };
    } else if (this.state.weather.includes("drizzle") || this.state.weather.includes("drizzle")) {
      return {
        backgroundImage: `url('${rainy}')`
      };
    }
  };

  getLocation = () => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(function (position) {
        location.lat = position.coords.latitude;
        location.lon = position.coords.longitude;
        if (location.lon !== "") {
          resolve();
        }
      });
    });
  };

  render() {
    return (
      <div className="App" style={this.getStyle()}>
        <Intro weather={this.state.weather} />
      </div>
    );
  }
  async componentDidMount() {
    await this.getLocation();
    this.getWeather(location.lat, location.lon);
    console.log("bros");
  }
}

export default App;

import React, { Component } from 'react';

class Intro extends Component {
    state = {
    }

    getText = () => {
        let text = ""
        if (this.props.weather.includes('clear')) {
            text = "clear";
        } else if (this.props.weather.includes('few clouds')) {
            text = "a little cloudy";
        } else if (this.props.weather.includes('rain') || this.props.weather.includes('drizzle')) {
            text = "raining";
        } else if (this.props.weather.includes('thunderstorm')) {
            text = "a thunderstorm";
        } 
        return text;
    }
    render() { 
        return ( 
            <div className="App-intro">
                <h1>It looks like it's {this.getText()}</h1>
            </div>
         );
    }
}


export default Intro;
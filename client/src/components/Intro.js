import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router'

class Intro extends Component {
    state = {
    }


    getText = () => { //changes text based on weather which is passed down as prop
        let text = ""
        if (this.props.weather.includes('clear')) {
            text = " It looks like it's clear";
        } else if (this.props.weather.includes('few clouds') || this.props.weather.includes('scattered clouds'))  {
            text = "It looks like it's a little cloudy";
        } else if (this.props.weather.includes('clouds')) {
            text = "It looks like it's cloudy";
        } else if (this.props.weather.includes('rain') || this.props.weather.includes('drizzle')) {
            text = "It looks like it's raining";
        } else if (this.props.weather.includes('thunderstorm')) {
            text = "It looks like a thunderstorm";
        } else if (this.props.weather.includes('snow')) {
            text = "It looks like it's snowing";
        } else {
            text = "We're not quite sure what weather it is. But we can still reccomend some happy music!"
        }
        return text;
    }
    render() { 
        return ( 
            <div className="App-intro">
                <h1 style = {this.props.weather.includes("clear") || this.props.weather.includes("rain") || this.props.weather.includes("thunderstorm") ? {color:"white"} : {color: "green"}}> {this.getText()} </h1>
                <Button onClick = {()=>{this.props.history.push('/Login')}}variant="success" size="lg">Get Songs</Button>{' '}
                
            </div>
         );
    }

    componentDidMount(){
        console.log(this.props.weather);
    }
}


export default withRouter(Intro);
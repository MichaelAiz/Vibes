import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { withRouter } from 'react-router'



class Intro extends Component {
    state = {
    }


    getText = () => { //changes text based on weather which is passed down as prop
        let text = ""
        if (this.props.weather.includes('clear')) {
            text = "clear";
        } else if (this.props.weather.includes('few clouds') || this.props.weather.includes('scattered clouds'))  {
            text = "a little cloudy";
        } else if (this.props.weather.includes('clouds')) {
            text = "cloudy";
        } else if (this.props.weather.includes('rain') || this.props.weather.includes('drizzle')) {
            text = "raining";
        } else if (this.props.weather.includes('thunderstorm')) {
            text = "a thunderstorm";
        } 
        return text;
    }

   /* getTextColor = () => {
        if(this.props.weather.includes('clear')) 
    }*/
    render() { 
        return ( 
            <div className="App-intro">
                <h1 style = {this.props.weather.includes("clear") || this.props.weather.includes("rain") || this.props.weather.includes("thunderstorm") ? {color:"white"} : {color: "green"}}>It looks like it's {this.getText()}</h1>
                <Button onClick = {()=>{this.props.history.push('/Login')}}variant="success" size="lg">Get Songs</Button>{' '}
                
            </div>
         );
    }

    componentDidMount(){
        console.log(this.props.weather);
    }
}


export default withRouter(Intro);
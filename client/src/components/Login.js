import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
const queryString = require('querystring');

// Credentials 
const scope = 'user-read-private user-top-read user-modify-playback-state user-read-playback-state';
const redirectURI = 'https://michaelaiz.github.io/Vibes//music';
//const redirectURI = 'http://localhost:3000/callback';
const authURL = 'https://accounts.spotify.com/authorize?' + queryString.stringify({
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    response_type: 'token',
    redirect_uri: redirectURI,
    scope:scope,
})


class Login extends Component {
    state = {  }
    render() { 
        return ( <div className = "login">
            <h1 style = {this.props.weather.includes("clear") || this.props.weather.includes("cloud") || this.props.weather.includes("thunderstorm") ? {color:"white"} : {color: "green"}}>You'll Need To Sign In With Spotify</h1> 
            <a href={authURL}><Button variant = "success" size = "lg">Sign In</Button></a>
        </div> ); //text colour changes bsed on weather because different background images work better with different colours
    }
}

 
export default Login;
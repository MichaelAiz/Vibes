import React, { Component } from 'react'
const queryString = require('querystring');
// Credentials npm start

const clientID = '9737ac731f60418487a893e859a3144b';

const scope = 'user-read-private user-top-read user-modify-playback-state user-read-playback-state';
const redirectURI = 'http://localhost:3000/callback';
const authURL = 'https://accounts.spotify.com/authorize?' + queryString.stringify({
    client_id: clientID,
    response_type: 'token',
    redirect_uri: redirectURI,
    scope:scope,
})


class Login extends Component {
    state = {  }
    render() { 
        return ( <div className = "login">
            <h1>You'll Need To Sign In With Spotify</h1>
            <a href={authURL}><button className='button-primary button-colors center'>Sign In With Spotify</button></a>
        </div> );
    }
}

 
export default Login;
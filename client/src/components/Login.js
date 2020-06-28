import React, { Component } from 'react'
const queryString = require('querystring');
// Credentials 

const clientID = '9737ac731f60418487a893e859a3144b';

const scope = 'user-read-private user-top-read user-modify-playback-state';
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
        return ( <div style = {{
            height:"100vh",
        }} className = 'globals'>
            <div style = {{
                position: 'absolute', left: '50%', top: '45%',
                transform: 'translate(-50%, -50%)'
            }}>
                <h1 className='text header'>Let's Get Started</h1>
                <h4 className='text' style = {{'text-align': 'center'}}> You'll need to sign into Spotify to continue</h4>
                <a href={authURL}><button className='button-primary button-colors center'>Sign In With Spotify</button></a>
            </div>
        </div> );
    }
}
 
export default Login;
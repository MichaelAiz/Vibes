import React, { Component } from 'react';
import Login from "./Login";
import Songs from "./Songs";
const queryString = require('querystring');

// This component is used to extract the access token from the callback uri

class MusicWrapper extends Component {
    state = {
            authorized: false,
            accessToken: null,
    }

    getToken = () => {
        let hashParams = queryString.parse(window.location.href.split('#/')[1]);
        let token = hashParams.access_token;
        if(!token) {
            return false;
        } else {
            return token;
        }


    }

    componentDidMount() {
        const token = this.getToken();
        token ? this.setState({authorized: true, token: token}) : this.setState({authorized: false, token: null});
        
    }

    render() { 
        return ( 
            <React.Fragment>
                {this.state.authorized ? <Songs token = {this.state.token} weather = {this.props.weather} time = {this.props.time}/> : <Login weather = {this.props.weather}/>}
            </React.Fragment>
         );
    }
}
 
export default MusicWrapper;
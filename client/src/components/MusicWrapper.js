import React, { Component } from 'react';
import Login from "./Login";
import Songs from "./Songs";
const queryString = require('querystring');


class MusicWrapper extends Component {

    state = {
            authorized: false,
            accessToken: null,
    }
   /* getToken = () => {
        if(window.location.href.includes('?')){
            console.log('no');
        } else {
            const params = queryString.parse(window.location.href.split('#')[1])
            console.log(params);

        }*/
   /* checkForToken = () => {
        const params = getHashParams();
    }*/

    getToken = () => {
        let hashParams = queryString.parse(window.location.href.split('#')[1]);
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
        console.log(this.props);
        
    }

    render() { 
        return ( 
            <React.Fragment>
                {this.state.authorized ? <Songs token = {this.state.token} weather = {this.props.weather} time = {this.props.time}/> : <Login/>}
            </React.Fragment>
         );
    }
}
 
export default MusicWrapper;
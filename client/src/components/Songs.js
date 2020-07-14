import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { withRouter } from 'react-router';

let Spinner = require('react-spinkit');



// The Spotify ids of songs that are used as seeds, completely arbitrary and based on my own opinions
let clearDaySeeds = ["60nZcImufyMA1MKQY3dcCH", "6FE2iI43OZnszFLuLtvvmg"]; //Happy - Pharrel Williams, Classic - MKTO
let clearNightSeeds = [
  "6uSAPAnkFuSaL4f74KtBmD",
  "3lAun9V0YdTlCSIEXPvfsY",
]; // Spirits Of The Moor - Emile Franck, La Vie En Rose - Edith Piaf
//let cloudySeeds = ["62aP9fBQKYKxi7PDXwcUAS", "6vRCKJDtnrJEcyyzIMa0w0"]; //ily (I love you baby) - Surf Mesa, Never Go Back - Dennis Lloyd
let cloudySeeds = ["0JmiBCpWc1IAc0et7Xm7FL", "1HNkqx9Ahdgi1Ixy2xkKkL"]; 
let rainySeeds = ["0JmiBCpWc1IAc0et7Xm7FL", "1HNkqx9Ahdgi1Ixy2xkKkL"]; //Let Her Go - Passenger, Photograph - Ed Sheeran
let stormSeeds = ["0aOluBqXYd0rFSCsgDyAWX", "3z8ypl55NHugzc6EDVVFdF"]; //Take Me To Church - Hozier, I Of The Storm - Of Monsters and Men
let snowySeeds = ["2wCPMWR3y4xclijuCcLJv7", "1prYSRBfwPvE3v8jSRZL3Q"]; // Jingle Bell Rock - Bobby Helms, Let it Snow - Dean Martin

class Songs extends Component {
  state = {
    songs: [],
    songAmount: 0 //used to track the number of songs that have been loaded, to make sure they all appear at once
  };

  componentDidMount() {
    this.getSongs();
  }

  

  getSongs = () => {
    window.scrollTo(0,0);
    this.setState({songAmount : 0})
    let seedTracks = this.getSeeds();

    axios({
      method: "get",
      url: `https://api.spotify.com/v1/recommendations?limit=6&seed_tracks=${seedTracks[0]},${seedTracks[1]}&popularity=90`,
      headers: { Authorization: "Bearer " + this.props.token }
    })
      .then((res) => this.setState({ songs: res.data.tracks }))
      .catch(err => err.response.status === 400 ? this.props.history.push('/Login') : alert(err)); //catches error when access token expires and redirects to login page 
  };

  getSeeds = () => { //decides which set of seed tracks to use based on the weather
    let seeds = ["bro"];
    console.log(this.props);
    if (
      this.props.weather.includes("clear") &&
      this.props.time.includes("day")
    ) {
      seeds = clearDaySeeds;
    } else if (
      this.props.weather.includes("clear") &&
      this.props.time.includes("night")
    ) {
      seeds = clearNightSeeds;
    } else if (this.props.weather.includes("clouds")) {
      seeds = cloudySeeds;
    } else if (
      this.props.weather.includes("rain") ||
      this.props.weather.includes("drizzle")
    ) {
      seeds = rainySeeds;
    } else if (this.props.weather.includes("thunderstorm")) {
      seeds = stormSeeds;
    }
    return seeds;
  };

  addSong = () => { //
    this.setState({songAmount: this.state.songAmount + 1});
  }



  

  render() {
    return (
      <div>
        <div style={this.props.weather.includes("clear") || this.props.weather.includes("rain")  || this.props.weather.includes("thunderstorm") ? {color:"white"} : {color: "green"}}>
          <h1 className = "song-header" style={{fontSize: "3rem"}}>Vibes</h1>
        </div>
        <div>
          <Spinner style = {this.state.songAmount === 6 ? {display: "none"}: {visibility: "visible"}} name="line-scale-pulse-out" fadeIn = "none" /> 
        </div>
        <Grid className = "song-grid" container direction="row" justify="center" spacing={3} >
          {this.state.songs.length === 6 ? this.state.songs.map((song) => ( //only starts to load iframes when all songs have been added to the array 
            <Grid className = "song" item key = {song.id} xs={12} sm={6} lg={4} align="center" style={this.state.songAmount === 6 ? {opacity: "1"} : {opacity: "0"}}> 
              <iframe className = "song-card"  onLoad = {this.addSong} src={`https://open.spotify.com/embed/track/${song.id}`} width="300" height="380" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </Grid>
          )) : null //iframes stay hidden until all of them have been loaded fo better user experience
        }
        </Grid>
        <div>{this.state.songAmount === 6 ? <Button onClick = {this.getSongs} variant = "success" size = "lg" style = {{margin: "1rem"}}>New Songs</Button> : null}</div>
      </div>
    );
 }
}

export default withRouter(Songs);

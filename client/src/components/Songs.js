import React, { Component } from "react";
import Song from "./Song";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

// The Spotify ids of songs that are used as seeds, completely arbitrary and based on my own opinions
let clearDaySeeds = ["60nZcImufyMA1MKQY3dcCH", "6VojZJpMyuKClbwyilWlQj"]; //Happy - Pharrel Williams, Wouldn't it be Nice - Beach Boys
let clearNightSeeds = [
  "6uSAPAnkFuSaL4f74KtBmD",
  "6uSAPAnkFuSaL4f74KtBmDspotify:track:3lAun9V0YdTlCSIEXPvfsY",
]; // Spirits Of The Moor - Emile Franck, La Vie En Rose - Edith Piaf
let cloudySeeds = ["62aP9fBQKYKxi7PDXwcUAS", "6vRCKJDtnrJEcyyzIMa0w0"]; //ily (I love you baby) - Surf Mesa, Never Go Back - Dennis Lloyd
let rainySeeds = ["0JmiBCpWc1IAc0et7Xm7FL", "1HNkqx9Ahdgi1Ixy2xkKkL"]; //Let Her Go - Passenger, Photograph - Ed Sheeran
let stormSeeds = ["0aOluBqXYd0rFSCsgDyAWX", "3z8ypl55NHugzc6EDVVFdF"]; //Take Me To Church - Hozier, I Of The Storm - Of Monsters and Men
let snowySeeds = ["2wCPMWR3y4xclijuCcLJv7", "1prYSRBfwPvE3v8jSRZL3Q"]; // Jingle Bell Rock - Bobby Helms, Let it Snow - Dean Martin

class Songs extends Component {
  state = {
    songs: [1, 3, 4, 5],
    deviceID: undefined
  };

  componentDidMount() {
    this.getSongs();
    axios({
      method: "get",
      url: "https://api.spotify.com/v1/me/player/devices",
      headers: { Authorization: "Bearer " + this.props.token }
    })
    .then((res) => console.log(res));
  }



  

  getSongs = () => {
    let seedTracks = this.getSeeds();

    axios({
      method: "get",
      url: `https://api.spotify.com/v1/recommendations?limit=6&seed_tracks=${seedTracks[0]},${seedTracks[1]}`,
      headers: { Authorization: "Bearer " + this.props.token }
    })
      .then((res) => this.setState({ songs: res.data.tracks }))
      .then((res) => console.log(this.state.songs));
  };

  getSeeds = () => {
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


  render() {
    return (
      <div>
        <div style={{ textAlign: "center" }}>
          <h1 className = "song-header">Vibes</h1>
        </div>
        <Grid container direction="row" justify="center" spacing={3}>
          {this.state.songs.length == 6 ? this.state.songs.map((song) => (
            <Grid item xs={12} sm={6} lg={4} align="center">
              <Song name = {song.name} image = {song.album.images[0].url} songSRC = {`https://open.spotify.com/embed/track/${song.id}`}/>
            </Grid>
          )) : <h1>Hi</h1>}
        </Grid>
      </div>
    );
  }
}

export default Songs;

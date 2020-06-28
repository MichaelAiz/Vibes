import React, { Component } from "react";
import Song from "./Song";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
class Songs extends Component {
  state = {};

  componentDidMount() {
    axios({
      method: "get",
      url: "https://api.spotify.com/v1/me/playlists",
      headers: { Authorization: "Bearer " + this.props.token },
    }).then((response) => {
      console.log(response);
    });
  }

  render() {
    return (
      <div>
        <div style = {{textAlign: "center"}}>
            <h1>Music For You</h1>
        </div>
        <Grid container direction="row" justify="center" spacing={3}>
          <Grid item xs={12} sm={6} lg={4} align="center">
            <Song />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}  align = "center">
            <Song />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}  align = "center">
            <Song />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}  align = "center">
            <Song />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}  align = "center">
            <Song />
          </Grid>
          <Grid item xs={12} sm={6} lg={4}  align = "center">
            <Song />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Songs;

import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import rainy from "../assets/rainy.jpg";
import Button from "react-bootstrap/Button";

const Song = (props) => {
  return ( 
    <div>
      <iframe className = "song-card" src={props.songSRC} width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </div>
    
      

 ); 
}
 
export default Song;



import React, { Component } from 'react'
import Card from 'react-bootstrap/Card';
import rainy from "../assets/rainy.jpg";
import Button from "react-bootstrap/Button";
class Song extends Component {
    state = {  }
    render() { 
        return ( 
            <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src={rainy} />
                <Card.Body>
                  <Card.Title>Song Title</Card.Title>
                  <Button variant="primary">Play</Button>
                </Card.Body>
              </Card>
         );
    }
}
 
export default Song;

import React, {Component} from  'react';
import ReactMapboxGl from 'react-map-gl';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: 37.7749, 
      lon: 122.4194
    };
  }
  render() {
    const Map = new ReactMapboxGl({
      accessToken:"pk.eyJ1Ijoia2VsbG9nc2Zyb3N0IiwiYSI6ImNqeWczNmpzMDBjZTIzY25zMTA4c3Rua2kifQ.35nrFDEmWd-FM7wjj6sgAg"
    });
    return (
      <>
        <h3>Map to interview</h3>
      <Map>
          style={`mapbox://styles/mapbox/streets-v9`}
      </Map>

      </>
    );
  }
}

export default Map;


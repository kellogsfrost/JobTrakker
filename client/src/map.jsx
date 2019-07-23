import React, {Component} from  'react';
import ReactMapGL from 'react-map-gl';

class Map extends Component {

  state = {
    viewport: { 
      width: 400,
      height: 400,
      latitude: 37.7577,
      longitude: -122.4376,
      zoom: 8
    }
  };

  render() {
    
      const Map = new ReactMapboxGl({
        accessToken:
          'pk.eyJ1IjoiZ2FycmV0dG1vb3JlIiwiYSI6ImNqdHQ0dWMyZzE3bDMzemxsNDJkM3hrdnoifQ.1v2jNBqVj1p6jhAKJkHY0A',
        // center: [this.state.lon, this.state.lat]
      });
      return (
        <>
          <h3>Find a Starbunker near you!</h3>
        <Map
            height='200px'
            style={`mapbox://styles/garrettmoore/cjtuh2gkn00ja1gt3xa94pqmo`}
            zoom={[0.5]}
            // center={[this.state.lon, this.state.lat]}
            containerStyle={{ height: '40em' }}>
        </Map>

        </>
      );
    }
  }
  

export default Map;
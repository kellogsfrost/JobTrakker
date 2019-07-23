import React, {Component} from  'react';
import ReactMapboxGl from 'react-mapbox-gl';

function Map() {
  const Map = new ReactMapboxGl({
    accessToken: 'pk.eyJ1IjoibWNkdWRsZXk4NyIsImEiOiJjanhlejR5YWIwdWFwM25tcHNubDdpejIwIn0.n-RmlJrsycjQ76M82M_02Q',
    container: 'map',
    center: {
      lng: -122.341408,
      lat: 47.609797
    },
    zoom: 9
  });

  return (
    <div className="App">
      <Map
          center = {[-122.341408, 47.609797]}
          style="mapbox://styles/mapbox/streets-v9"
          containerStyle={{
            height: '100vh',
            width: '100vw'
          }}
        >
</Map>;
    </div>
  );
}
// class Map extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       lat: 37.7749, 
//       lon: 122.4194
//     };
//   }
//   render() {
//     const Map = new ReactMapboxGl({
//       accessToken:"pk.eyJ1Ijoia2VsbG9nc2Zyb3N0IiwiYSI6ImNqeWczNmpzMDBjZTIzY25zMTA4c3Rua2kifQ.35nrFDEmWd-FM7wjj6sgAg"
//     });
//     return (
//       <>
//       <Map>
//         style={`mapbox://styles/mapbox/streets-v9`}
//         containerStyle={{height: '800px', width: '800px'}}
//       </Map>
  
//       </>
//     );
//   }
// }

export default Map;

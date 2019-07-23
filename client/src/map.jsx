import React from  'react';
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
        </Map>
    </div>
  );
}

export default Map;


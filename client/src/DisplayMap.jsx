// import React from  'react';
// import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
// import MapMarker from './Marker';


// function DisplayMap() {
//   const Map = new ReactMapboxGl({
//     accessToken: 'pk.eyJ1IjoibWNkdWRsZXk4NyIsImEiOiJjanhlejR5YWIwdWFwM25tcHNubDdpejIwIn0.n-RmlJrsycjQ76M82M_02Q',
//     container: 'map',
//     zoom: 9
   
//   });

//   return (
//     <div className="App">
//       <Map 
//           center = {[-122.341408, 47.609797]}
//           style="mapbox://styles/mapbox/streets-v9"
//           containerStyle={{
//             height: '100vh',
//             width: '100vw'
//           }}
//           >
//             <Marker></Marker>
//         </Map>
//     </div>
//   );
// }


// export default DisplayMap;

import React from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import MapMarker from './Marker';


class Map extends React.Component {

	render () {
		// let creating = this.props.creating
				//SAVE THE BELOW TWO LINES
		// let lng = this.props.lng
    // let lat = this.props.lat
    //render the user interview lat long
		// let lng = this.props.lng ? this.props.lng : -122.3774
		// let lat = this.props.lat ? this.props.lat : 47.8107

		const Map = new ReactMapboxGl({
			accessToken: 'pk.eyJ1IjoibWNkdWRsZXk4NyIsImEiOiJjanhlejR5YWIwdWFwM25tcHNubDdpejIwIn0.n-RmlJrsycjQ76M82M_02Q',
			container: 'map',
			minZoom: 12,
			maxZoom: 16
		},		
	);

	return (
			<>
				<div className="mapboxBox">
					<Map
						center={[lng, lat]}
						style="mapbox://styles/mapbox/streets-v9"
						containerStyle={{
							height: '800px',
							width: '800px'
						}}>
              {/* Make this render interview location */}
						{/* <Marker coordinates={[lng, lat]}
							style={{backgroundColor: 'rgba(0, 0, 0, 50% )', height: '25px', width: '25px', borderRadius: '50%'}}>
						</Marker> */}
						<MapMarker	/>
					</Map>
				</div>
				<button onClick={this.handleButtonClick}>Don't Look At Me</button>
			</>
		)
	}
}	

export default Map;





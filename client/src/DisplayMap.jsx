import React from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import MapMarker from './Marker';
import axios from 'axios';


class Map extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			lng: '',
			lat: ''
		}
	}

	componentDidMount() {
		//get a location from props
		// axios post request to /geo/code
		axios.post('/geo/code',{
			location: "24970 SE 362nd ln Enumclaw, WA"
		}).then( result => {
			this.setState({
				lng: result.data[0],
				lat: result.data[1]
			})
		})
	}

	render () {
		let lng = this.state.lng ? this.state.lng : -122.3774
		let lat = this.state.lat ? this.state.lat : 47.8107

		const Map = new ReactMapboxGl({
			accessToken: 'pk.eyJ1IjoibWNkdWRsZXk4NyIsImEiOiJjanhlejR5YWIwdWFwM25tcHNubDdpejIwIn0.n-RmlJrsycjQ76M82M_02Q',
			container: 'map',
			minZoom: 8,
			maxZoom: 16
		},		
	);

	return (
			<>
				<div className="mapboxBox">
					<Map
						center={[-122.3321, 47.6062]}
						style="mapbox://styles/mapbox/streets-v9"
						containerStyle={{
							height: '800px',
							width: '800px'
						}}>
              {/* Make this render interview location */}
						<Marker coordinates={[lng, lat]}
							style={{backgroundColor: 'green', height: '25px', width: '25px', borderRadius: '50%'}}>
						</Marker>
						<MapMarker	/>
					</Map>
				</div>
			</>
		)
	}
}	

export default Map;





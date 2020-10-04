import React, {Component} from 'react';
import { Map, Marker, GoogleApiWrapper, Circle } from 'google-maps-react';

class GoogleMap extends Component {
    constructor(props) {
        super(props);
    }

    

    render() {
        const styleSmallMap = {
            width: 400,
            height: 400
        }
        const styleBigMap = {
            width: '50%',
            height: '50%',
        }
        if (this.props.lat != null) {
            return( 
                <div id = "google-map" style = {styleSmallMap}>
                    <Map
                    google={this.props.google}
                    zoom={10}
                    initialCenter={{
                    lat: this.props.lat,
                    lng: this.props.lng
                    }}
                    style={styleSmallMap}
                    >
                    <Marker/>
                    </Map>
                </div>
            );
        } else { // main map
            return(
                <div id = "google-map" style = {styleBigMap}>
                    <Map
                    google={this.props.google}
                    zoom={6}
                    initialCenter={{
                    lat: 47.5,
                    lng: -120
                    }}
                    style={styleBigMap}
                    >
                    {
                    this.props.trails.map((item) =>
                        <Circle
                        center={{lat: item.LATITUDE, lng: item.LONGITUDE}}
                        radius={4000}
                        strokeColor= "#FF0000"
                        strokeOpacity= {0.5}
                        strokeWeight= {5}
                        fillColor= "#FF0000"
                        fillOpacity= {2}
                        strokeColor='transparent'
                        />
                    )}
                    </Map>
                </div>
            )
        }
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCBo2FIrkBJDLTp2lLxmQEb4HiE2k5rMEI')
   })(GoogleMap);
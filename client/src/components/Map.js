import React, {Component} from 'react';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

class GoogleMap extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const style = {
            width: '80%',
            height: '70%'
        }
        return( 
            <div id = "google-map" style = {style}>
                <Map
                google={this.props.google}
                zoom={10}
                initialCenter={{
                lat: this.props.lat,
                lng: this.props.lng
                }}
                style={style}
                >
                <Marker/>
                </Map>
            </div>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ('AIzaSyCBo2FIrkBJDLTp2lLxmQEb4HiE2k5rMEI')
   })(GoogleMap);
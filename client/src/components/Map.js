import React, {Component} from 'react';
import { Map, Marker, GoogleApiWrapper, Circle } from 'google-maps-react';

class GoogleMap extends Component {
    min = (a, b) => {
        if (a < b) {
            return a;
        } else {
            return b;
        }
    }
    score = (report_count, rating_count, length) => {
        let ans =  Math.abs(report_count + rating_count - 25) / 1 / (length + 0.0001);
        return 100 - this.min(6 * ans, 100);
    };

    perc2color(perc) {
        var r, g, b = 0;
        if(perc < 50) {
            r = 255;
            g = Math.round(5.1 * perc);
        }
        else {
            g = 255;
            r = Math.round(510 - 5.10 * perc);
        }
        var h = r * 0x10000 + g * 0x100 + b * 0x1;
        return '#' + ('000000' + h.toString(16)).slice(-6);
    }
    

    render() {
        const styleSmallMap = {
            width: 400,
            height: 400
        }
        const styleBigMap = {
            width: '50%',
            height: '50%',
            maxWidth: 1100,
            maxHeight: 450,
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
                        strokeOpacity= {0.5}
                        strokeWeight= {5}
                        fillColor= {this.perc2color(this.score(item.REPORT_COUNT, item.RATING_COUNT, item.DISTANCE))}
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
import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker, Map } from 'google-maps-react';


export class MapContainer extends Component {
  constructor(props){
    super(props)
    this.state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };
    this.onMarkerClick = this.onMarkerClick.bind(this)
    this.onClose = this.onClose.bind(this)
  }

    onMarkerClick = (props, marker, e) =>
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });

    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    render() {
      console.log(this.props);
        return (
            <Map
                google={this.props.google}
                zoom={14}
                initialCenter={{ lat: 28.5134859, lng: 77.0468193 }}>
                {this.props.marker.map(marker => (
                <Marker
                    key={marker._id}
                    title={'The marker`s title will appear as a tooltip.'}
                    name={marker.name}
                    onClick={this.onMarkerClick}
                    position={{ lat: parseFloat(marker.latitude), lng: parseFloat(marker.longitude) }} />
                ))}
                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <h4>{this.state.selectedPlace.name}</h4>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: process.env.GOOGLE_api_key
})(MapContainer);

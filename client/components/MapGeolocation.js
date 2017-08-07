
/* global google */

import canUseDOM from "can-use-dom";
import raf from "raf";
import React, { Component } from "react";
import { connect } from 'react-redux'
import { fetchTrucks, getSortedTrucks, putUser } from '../store'

import {
  withGoogleMap,
  GoogleMap,
  Circle,
  InfoWindow,
  Marker,
} from 'react-google-maps';

const geolocation = (
  canUseDOM && navigator.geolocation ?
  navigator.geolocation :
  ({
    getCurrentPosition(success, failure) {
      failure(`Your browser doesn't support geolocation.`);
    },
  })
);

const GeolocationGoogleMap = withGoogleMap(props => {
  props.trucks.forEach(elem => {
    elem.showInfo = false;
  })
  return (
    <GoogleMap
      defaultZoom={14}
      center={props.center}
    >
      {props.center && (
        <Marker position={props.center}>
        </Marker>
      )}
      {props.trucks && props.trucks.map(marker => {
        console.log(marker.showInfo)
        return (
          <Marker
            key={marker.id}
            position={{lat: +marker.lat, lng: +marker.lng}}
            icon='/cone.png'
            onClick={() => props.onMarkerClick(marker)}
          >
            {marker.showInfo && (
              <InfoWindow onCloseClick={() => props.onMarkerClose(marker)}>
                <div className="marker-info">
                  <p>hello</p>
                  {/*<h1>{marker.name}</h1>
                                    <p>{marker.routeStops.status}</p>
                                    <p>{marker.routeStops.departureTime}</p>*/}
                </div>
              </InfoWindow>
            )}
          </Marker>
        )
      })}
    </GoogleMap>
)
});

class GeolocationMap extends Component {

  constructor () {
    super()
    this.isUnmounted = false;
    this.state = {
      center: null,
      content: null,
      trucks: []
    };

    this.handleMarkerClick = this.handleMarkerClick.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
  };

  componentDidMount() {
    this.props.loadTrucks(this.state.center)
    geolocation.getCurrentPosition((position) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }
      });
      this.props.sortTrucks(this.props.trucks, this.state.center);
      this.setState({trucks: this.props.trucks})
      this.props.persistLocation(this.props.user, this.state.center)

    }, (reason) => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({
        center: {
          lat: 60,
          lng: 105,
        },
        content: `Error: The Geolocation service failed (${reason}).`,
      });
    });
  }

  componentWillUnmount() {
    this.isUnmounted = true;
  }

  render() {
    console.log('rerender')
    return (
      <GeolocationGoogleMap
        containerElement={
          <div id="map-container-div"style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        center={this.state.center}
        content={this.state.content}
        trucks={this.state.trucks}
        onMarkerClick={this.handleMarkerClick}
        onMarkerClose={this.handleMarkerClose}
      />
    );
  }

  handleMarkerClick(targetMarker) {
    console.log('click')
    this.setState({
      trucks: this.state.trucks.map(truck => {
        if (+truck.id === +targetMarker.id) {
          return {
            ...truck,
            showInfo: true
          };
        }
        return truck;
      }),
    });
  }

  handleMarkerClose(targetMarker) {
    this.setState({
      trucks: this.state.trucks.map(truck => {
        if (truck === targetMarker) {
          return {
            ...truck,
            showInfo: false,
          };
        }
        return truck;
      }),
    });
  }
}

const mapState = state => {
  return {
    lng: state.user.lng,
    lat: state.user.lat,
    trucks: state.trucks,
    user: state.user
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    loadTrucks (center) {
      dispatch(fetchTrucks(center))
    },
    sortTrucks (trucks, center) {
      dispatch(getSortedTrucks(trucks, center))
    },
    persistLocation (user, location) {
      dispatch(putUser({
        ...user,
        lat: location.lat,
        lng: location.lng
      }))
    }
  }
}

export default connect(mapState, mapDispatch)(GeolocationMap)

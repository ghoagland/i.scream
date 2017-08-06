
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

const GeolocationGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={14}
    center={props.center}
  >
    {props.center && (
      <Marker position={props.center}>
      </Marker>
    )}
    {props.trucks && props.trucks.map(elem => {
      return (<Marker
              key={elem.id}
              position={{lat: +elem.lat, lng: +elem.lng}}
              icon='/cone.png'
              >
      </Marker>)})
    }
  </GoogleMap>
));

class GeolocationMap extends Component {

  constructor () {
    super()
    this.isUnmounted = false;
    this.state = {
      center: null,
      content: null,
      radius: 500
    };
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
      this.props.sortTrucks(this.props.trucks, this.state.center)
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
    return (
      <GeolocationGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        center={this.state.center}
        content={this.state.content}
        radius={this.state.radius}
        trucks={this.props.trucks}
      />
    );
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

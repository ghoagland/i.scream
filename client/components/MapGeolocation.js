
/* global google */

import canUseDOM from "can-use-dom";
import raf from "raf";
import React, { Component } from "react";
import { connect } from 'react-redux'

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
    defaultZoom={12}
    center={props.center}
  >
    {props.center && (
      <Marker position={props.center}>
      </Marker>
    )}
  </GoogleMap>
));

class GeolocationMap extends Component {

  constructor () {
    super()
    this.state = {
      center: null,
      content: null,
      radius: 500,
    };
  }

  isUnmounted = false;

  componentDidMount() {
    const cone = '/cone.png'
    const tick = () => {
      if (this.isUnmounted) {
        return;
      }
      this.setState({ radius: Math.max(this.state.radius - 20, 0) });

      if (this.state.radius > 200) {
        raf(tick);
      }
    };
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

      raf(tick);
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
      />
    );
  }
}


export default GeolocationMap


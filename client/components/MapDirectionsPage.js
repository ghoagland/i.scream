/*global google*/
import {
  default as React,
  Component,
} from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  SearchBox
} from "react-google-maps";
import { connect } from 'react-redux'
import { fetchTrucks, fetchTruck, getCurrentTruck } from '../store'

const DirectionsExampleGoogleMap = withGoogleMap(props => (
  <GoogleMap
    defaultZoom={5}
    defaultCenter={props.center}
    marker
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

class Directions extends Component {

  constructor() {
    super();
    this.state = {
      directions: {}

    }
  }

  componentDidMount() {
    const {origin, destination} = this.props
    const DirectionsService = new google.maps.DirectionsService();

    DirectionsService.route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.WALKING,
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        this.setState({
          directions: result,
        });
      } else {
        console.error(`error fetching directions ${result}`);
      }
    });

  }

  render() {
    if (this.state.directions.routes){console.log(this.state.directions.routes[0].legs[0].duration.text);
    }
    const { origin } = this.props
    return (
      <DirectionsExampleGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        center={origin}
        directions={this.state.directions}
      />
    );
  }
}

const mapState = state => {
  return {
    lng: state.user.lng,
    lat: state.user.lat,
    trucks: state.trucks,
    user: state.user,
    currentTruck: state.currentTruck,
    origin: new google.maps.LatLng(state.user.lat, state.user.lng),
    destination:  new google.maps.LatLng(state.currentTruck.lat, state.currentTruck.lng)
  }
}

const mapDispatch = dispatch => {
  return {
    loadTrucks (center) {
      dispatch(fetchTrucks(center))
    },
    loadCurrentTruck (id) {
      dispatch(fetchTruck(id))
    },
    setCurrentTruck (truck){
      dispatch(getCurrentTruck(truck))
    }
  }
}

export default connect(mapState, mapDispatch)(Directions)

  // constructor () {
  //   super();
  //   this.state = {
  //     origin: null,
  //     destination: null,
  //     directions: null,
  //     id: null
  //   }
  // }

  // componentDidMount() {
  //   this.setState({id: +this.props.match.params.productId})
  //   this.props.loadTrucks();
  //   if (this.props.trucks && this.state.id) {
  //     const current = this.props.trucks.find(elem => (elem.id === this.state.id))
  //     this.props.setCurrentTruck(current);
  //   }
  //   if (this.props.currentTruck){
  //     this.setState({
  //       origin: new google.maps.LatLng(this.props.lat, this.props.lng),
  //       destination: new google.maps.LatLng(this.props.currentTruck.lat, this.props.currentTruck.lng),
  //     })
  //   }

  //   if (this.props.currentTruck.id){
  //     const DirectionsService = new google.maps.DirectionsService();
  //     DirectionsService.route({
  //       origin: this.state.origin,
  //       destination: this.state.destination,
  //       travelMode: google.maps.TravelMode.WALKING,
  //     }, (result, status) => {
  //       if (status === google.maps.DirectionsStatus.OK) {
  //         this.setState({
  //           directions: result,
  //         });
  //       } else {
  //         console.error(`error fetching directions ${result}`);
  //       }
  //     });
  //   }
  // }

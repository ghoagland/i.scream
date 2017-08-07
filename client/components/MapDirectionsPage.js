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
  constructor () {
    super();
    this.state = {
      origin: null,
      destination: null,
      directions: null,
      id: null
    }
  }

  componentDidMount() {
    this.setState({id: +this.props.match.params.productId})
    this.props.loadTrucks();
    if (this.props.currentTruck){
      this.setState({
        origin: new google.maps.LatLng(this.props.lat, this.props.lng),
        destination: new google.maps.LatLng(this.props.currentTruck.lat, this.props.currentTruck.lng),
      })
    }
    if (this.props.trucks && this.state.id) {
      const current = this.props.trucks.find(elem => (elem.id === this.state.id));
      console.log(current)
      this.props.setCurrentTruck(current);
    }
    console.log('STATE', this.state, 'PROPS', this.props)
    if (this.props.currentTruck){
      const DirectionsService = new google.maps.DirectionsService();
      DirectionsService.route({
        origin: this.state.origin,
        destination: this.state.destination,
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
  }

  render() {

    return (
      <DirectionsExampleGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        center={this.state.origin}
        directions={this.state.directions}
      />
    );
  }
}

const mapState = (state, ownProps )=> {
  return {
    lng: state.user.lng,
    lat: state.user.lat,
    trucks: state.trucks,
    user: state.user,
    currentTruck: state.currentTruck
  }
}

const mapDispatch = (dispatch, ownProps) => {
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

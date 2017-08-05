import axios from 'axios'

//ACTION TYPES

const GET_TRUCKS = 'GET_TRUCKS'
const GET_SORTED_TRUCKS = 'GET GET_SORTED_TRUCKS'


//INITIAL STATE
const defaultTrucks = []

//ACTION CREATORS
const getTrucks = trucks => ({type: GET_TRUCKS, trucks})

//helper for getSortedTrucks
const distance = (pt, center) => {
  return Math.sqrt(
    (pt.lat - center.lat)(pt.lat - center.lat)
    + (pt.lng - center.lng)(pt.lng - center.lng)
  )
}
//sorts trucks by distance from a set point
export const getSortedTrucks = (trucks, center) => {
  trucks.sort((a, b) => {
    return distance(a, center) < distance(b, center) ? -1 : 1
  })
  return {type: GET_SORTED_TRUCKS, trucks}
}

//THUNK CREATORS
export const fetchTrucks = () =>
  dispatch =>
    axios.get('/api/trucks')
    .then(res => dispatch(getTrucks(res.data)))
    .catch(err => console.log(err))

//REDUCER
export default function (state = defaultTrucks, action) {
  switch (action.type) {
    case GET_TRUCKS:
      return action.trucks
    case GET_SORTED_TRUCKS:
      return action.truckss
    default:
      return state
  }
}



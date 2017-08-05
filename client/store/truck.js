import axios from 'axios'

//ACTION TYPES

const GET_TRUCKS = 'GET_TRUCKS'


//INITIAL STATE
const defaultTrucks = []

//ACTION CREATORS
const getTrucks = trucks => ({type: GET_TRUCKS, trucks})

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
    default:
      return state
  }
}

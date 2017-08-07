import axios from 'axios'

//ACTION TYPES
const GET_CURRENT_TRUCK = 'GET_CURRENT_TRUCK'

//INITIAL STATE
const defaultTruck = {}

//ACTION CREATORS
export const getCurrentTruck = truck => ({type: GET_CURRENT_TRUCK, truck})

//THUNK CREATORS
export const fetchTruck = (id) =>
  dispatch =>
    axios.get(`/api/users/${id}`)
    .then(res => {
      dispatch(getCurrentTruck(res.data))
    })
    .catch(err => console.log(err))

//REDUCER
export default function (state = defaultTruck, action) {
  switch (action.type) {
    case GET_CURRENT_TRUCK:
      return action.truck;
    default:
      return state
  }
}

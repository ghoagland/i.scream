import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../store'

/**
 * COMPONENT
 */
class AuthForm extends Component {
  constructor() {
    super()
    this.handleOptionChange = this.handleOptionChange.bind(this)
    this.state = {
      selectedType: 'user'
    }
  }

  render () {
    const {name, displayName, handleSubmit, error } = this.props
    const { selectedType } = this.state;
      return (
       <div>
        <form onSubmit={handleSubmit} name={name}>
        {/*
          name === 'signup'
          &&
            <div>
              <div className="btn-group" data-toggle="buttons">
                <label className={`btn btn-primary ${selectedType === 'user' && 'active'}`}>
                  <input type="radio" name="options" value="user" checked={selectedType === 'user'} onChange={this.handleOptionChange} />
                  User
                </label>
                <label className={`btn btn-primary ${selectedType === 'truck' && 'active'}`}>
                  <input type="radio" name="options" value= "truck" checked={selectedType === 'truck'} onChange={this.handleOptionChange} />
                  Truck
                </label>
              </div>
              <label htmlFor='name'><small>Name</small></label>
              <input name='name' type='text' />
            </div>
        */}
          <div>
            <label htmlFor='email'><small>Email</small></label>
            <input name='email' type='text' />
          </div>
          <div>
            <label htmlFor='password'><small>Password</small></label>
            <input name='password' type='password' />
          </div>
          <div>
            <button type='submit'>{displayName}</button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href='/auth/google'>{displayName} with Google</a>
      </div>
    )
  }

  handleOptionChange (evt) {
    evt.preventDefault();
    this.setState({selectedType: evt.target.value});
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}

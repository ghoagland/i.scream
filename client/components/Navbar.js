import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout} from '../store'


const Navbar = props => {
  const { handleClick, isLoggedIn } = props;

  return (
    <nav>
      <Link to='/home'><img src="/logo.png" /></Link>
      {
        isLoggedIn
          ? <div>
            {/* The navbar will show these links after you log in */}
            <Link to='/map'>Map</Link>
            <a href='#' onClick={handleClick}>Logout</a>
          </div>
          : <div>
            {/* The navbar will show these links before you log in */}
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign Up</Link>
          </div>
      }
    </nav>
  )
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick () {
      dispatch(logout())
    }
  }
}


export default withRouter(connect(mapState, mapDispatch)(Navbar))

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

import React from 'react'
import { Link } from 'react-router-dom'

const Landing = props => (
  <div id="landing">
    <h1> Find your cone </h1>
    <div>
      <button type="button" className="btn btn-primary btn-lg">
        <Link to="/login">LOGIN</Link>
      </button>
      <button type="button" className="btn btn-success btn-lg">
        <Link to="/signup">SIGNUP</Link>
      </button>
    </div>
  </div>
)

export default Landing;

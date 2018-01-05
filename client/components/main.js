import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../store'
import { FilterTag, PriorityFilter } from './'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn } = props

  return (
    <div className="container">
      <div className="header row justify-content-between">
        <h1 className="col">Happy News</h1>
        <img
        className="col-2 smiley"
        src="https://s-media-cache-ak0.pinimg.com/originals/de/37/0d/de370d5a4173b5af0af15af518fbb1a6.jpg" height="110" />
      </div>
      <hr className="divider" />
      <div className="row">
        <div className="col bg-light">
          <h4 className="filterName">Filter</h4>
          <FilterTag />
          <h4 className="filterName">Prioritize</h4>
          <PriorityFilter />
        </div>
        {children}
        <div className="col align-items-center bg-light">
          <h6 className="text-muted about">Start your day off on the right foot with Happy News. Using the <b>Google Natural Language API</b>, Happy News sorts top stories from the <b>NYTimes</b> and ranks them according to postitivity. Happier articles appear first on the feed while negative articles appear last.</h6>
        </div>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

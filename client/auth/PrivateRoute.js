import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import auth from './auth-helper'

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/signin',
        state: { from: props.location }
      }}/>
    )
  )}/>
  /* || 
		process.env.MONGO_HOST ||
		"mongodb://" +
			(process.env.IP || "localhost") +
			":" +
			(process.env.MONGO_PORT || "27017") +
      "/mernproject",*/
      
      /**mongoUri:
    process.env.MONGODB_URI  */
    /*mongoUri:
		process.env.MONGODB_URI || 
		process.env.MONGO_HOST ||
		"mongodb://" +
			(process.env.IP || "localhost") +
			":" +
			(process.env.MONGO_PORT || "27017") +
			"/mernproject",*/
)

export default PrivateRoute

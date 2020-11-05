import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import Signup from './user/Signup'
import Signin from './auth/Signin'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import StudentProfile from './user/studentProfile'
import AccessCard from './user/accesscard'
import PrivateRoute from './auth/PrivateRoute'
import Menu from './core/Menu'
import Admin from './user/adminProfile'

function MainRouter() {
  return (<div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/users" component={Users} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <Route path="/user/accesscard/:userId" component={AccessCard} />
      <Route path="/user/edit/:userId" component={EditProfile} />
      <Route path="/user/:userId" component={Profile} />
      <Route path = "/student/:userId" component = {StudentProfile} />
      <Route path="/admin/:userId" component={Admin} />
    </Switch>
  </div>)
}

export default MainRouter

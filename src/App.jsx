import { hot } from 'react-hot-loader/root'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Home from 'views/pages/Home'
import CreateGroup from 'views/pages/CreateGroup'
import JoinGroup from 'views/pages/JoinGroup'
import GroupDetails from 'views/pages/GroupDetails'
import RateMovies from 'views/pages/RateMovies'
import { Grid, Typography, Button, Card, CardMedia, CardContent, CardActions } from '@material-ui/core/'
import * as uiActions from 'actions/ui'

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  },
}

class App extends Component {
  render () {
    const { currentUser } = this.props
    return (
      <div>
        <Button size='small' color='primary' onClick={this.handleOnHome}>
          Home
        </Button>
        {currentUser ? this.renderContent() : this.renderLogin()}
      </div>
    )
  }

  renderLogin () {
    return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  }

  renderContent () {
    const { page } = this.props

    switch (page.type) {
      case 'Home': return <Home />
      case 'CreateGroup': return <CreateGroup />
      case 'JoinGroup': return <JoinGroup />
      case 'GroupDetails': return <GroupDetails />
      case 'RateMovies': return <RateMovies />
    }
    // return <div>Logged in as {currentUser.displayName}</div>
  }

  handleOnHome = () => {
    const { dispatch } = this.props
    dispatch(uiActions.changePage('Home'))
  }
}

let ExportedApp = App

if (module && module.hot) {
  ExportedApp = hot(App)
}

function mapStateToProps (state) {
  return {
    currentUser: state.users.current,
    page: state.ui.page
  }
}

export default connect(mapStateToProps)(ExportedApp)

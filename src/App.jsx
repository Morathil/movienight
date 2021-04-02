import { hot } from 'react-hot-loader/root'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

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
        {currentUser ? this.renderContent() : this.renderLogin()}
      </div>
    )
  }

  renderLogin () {
    return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  }

  renderContent () {
    const { currentUser } = this.props

    return <div>Logged in as {currentUser.displayName}</div>
  }
}

let ExportedApp = App

if (module && module.hot) {
  ExportedApp = hot(App)
}

function mapStateToProps (state) {
  return {
    currentUser: state.users.current
  }
}

export default connect(mapStateToProps)(ExportedApp)

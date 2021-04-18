import { connect } from 'react-redux'
import React, { Component } from 'react'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { Grid, Typography, Box, Button, Card, CardMedia, CardContent, CardActions } from '@material-ui/core/'

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

class Login extends Component {
  render () {
    const { currentUser } = this.props
    
    return (
      <Grid container style={{ minHeight: '100vh' }} direction='column'>
        <Grid item xs={12} style={{ padding: '10px' }}>
          <Box textAlign='center'>
            <Typography variant='h5'>
              Movienight
            </Typography>
          </Box>
        </Grid>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      </Grid>
    )
  }
}

function mapStateToProps (state) {
  return {
    currentUser: state.users.current,
    page: state.ui.page
  }
}

export default connect(mapStateToProps)(Login)

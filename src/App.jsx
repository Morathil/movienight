import { hot } from 'react-hot-loader/root'
import { connect } from 'react-redux'
import React, { Component } from 'react'
import Home from 'views/pages/Home'
import CreateGroup from 'views/pages/CreateGroup'
import JoinGroup from 'views/pages/JoinGroup'
import GroupDetails from 'views/pages/GroupDetails'
import RateMovies from 'views/pages/RateMovies'
import Login from 'views/pages/Login'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import theme from './theme'

class App extends Component {
  render () {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {this.renderContent()}
      </ThemeProvider>
    )
  }

  renderContent () {
    const { page, currentUser } = this.props

    if (!currentUser) {
      return <Login />
    }

    switch (page.type) {
      case 'Home': return <Home />
      case 'CreateGroup': return <CreateGroup />
      case 'JoinGroup': return <JoinGroup />
      case 'GroupDetails': return <GroupDetails />
      case 'RateMovies': return <RateMovies />
    }
    // return <div>Logged in as {currentUser.displayName}</div>
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

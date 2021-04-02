import { hot } from 'react-hot-loader/root'
import { connect } from 'react-redux'
import React, { Component } from 'react'

class App extends Component {
  render () {
    return (
      <div>Movienight</div>
    )
  }
}

let ExportedApp = App

if (module && module.hot) {
  ExportedApp = hot(App)
}

function mapStateToProps (state) {
  return {
  }
}

export default connect(mapStateToProps)(ExportedApp)

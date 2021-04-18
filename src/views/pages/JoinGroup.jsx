import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Grid, Typography, Button, TextField } from '@material-ui/core/'
import * as uiActions from 'actions/ui'
import * as groupsActions from 'actions/groups'
import BottomButton from 'views/components/BottomButton'
import TopBar from 'views/components/TopBar'

class JoinGroup extends Component {
  state = {
    joinToken: undefined
  }

  render () {
    const { currentUser } = this.props
    const { joinToken } = this.state

    return (
      <Grid container style={{ minHeight: '100vh' }} direction='column'>
        <TopBar />
        <Grid item xs={12} style={{ flexGrow: 1, overflowY: 'scroll', maxHeight: '76vh' }}>
          <TextField style={{ margin: '2px' }} onChange={this.handleOnChange} fullWidth id='joinToken' label='Join Token' value={joinToken || ''} />
        </Grid>
        <Grid item xs={12}>
          <BottomButton onAction={this.handleOnJoinGroup}>
            Join Group
          </BottomButton>
        </Grid>
      </Grid>
    )
  }

  handleOnChange = (event) => {
    const value = event.target.value
    this.setState({ [event.target.id]: value })
  }

  handleOnJoinGroup = () => {
    const { dispatch } = this.props
    const { joinToken } = this.state

    if (joinToken) {
      dispatch(groupsActions.joinGroup(joinToken))
    }
  }
}

function mapStateToProps (state) {
  return {
    currentUser: state.users.current
  }
}

export default connect(mapStateToProps)(JoinGroup)

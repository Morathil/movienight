import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Grid, Typography, Button, TextField } from '@material-ui/core/'
import * as uiActions from 'actions/ui'
import * as groupsActions from 'actions/groups'

class JoinGroup extends Component {
  state = {
    joinToken: undefined
  }

  render () {
    const { currentUser } = this.props
    const { joinToken } = this.state

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h3'>
            Join Group
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField style={{ margin: '2px' }} onChange={this.handleOnChange} fullWidth id='joinToken' label='Join Token' value={joinToken || ''} />
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' color='primary' onClick={this.handleOnJoinGroup}>
            Join Group
          </Button>
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

import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Grid, Typography, Button, ButtonBase } from '@material-ui/core/'
import * as uiActions from 'actions/ui'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

class Home extends Component {
  render () {
    const { groups } = this.props

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h3'>
            Movienight
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {Object.values(groups).map((group) => {
            return (
              <Grid container key={group.id}>
                <ButtonBase onClick={this.handleShowGroupDetails.bind(this, group.id)}>
                  <Grid item xs={6}>
                    <Typography variant='body1'>
                      {group.name}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <ArrowForwardIcon />
                  </Grid>
                </ButtonBase>
              </Grid>
            )
          })}
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' color='primary' onClick={this.handleOnCreateGroup}>
            Create Group
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' color='primary' onClick={this.handleonJoinGroup}>
            Join Group
          </Button>
        </Grid>
      </Grid>
    )
  }

  handleShowGroupDetails = (groupId) => {
    const { dispatch } = this.props
    dispatch(uiActions.changePage('GroupDetails', { groupId }))
  }

  handleOnCreateGroup = () => {
    const { dispatch } = this.props
    dispatch(uiActions.changePage('CreateGroup'))
  }

  handleonJoinGroup = () => {
    const { dispatch } = this.props
    dispatch(uiActions.changePage('JoinGroup'))
  }
}

function mapStateToProps (state) {
  return {
    currentUser: state.users.current,
    groups: state.groups.entities
  }
}

export default connect(mapStateToProps)(Home)

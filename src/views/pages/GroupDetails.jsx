import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Grid, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core/'
import * as uiActions from 'actions/ui'
import * as groupsActions from 'actions/groups'
import BottomButton from 'views/components/BottomButton'
import TopBar from 'views/components/TopBar'

class GroupDetails extends Component {
  render () {
    const { group, topRatedMovies } = this.props
    //const { groupToken } = this.state
    return (
      <Grid container style={{ minHeight: '100vh' }} direction='column'>
        <TopBar />
        <Grid item xs={12}>
          <Typography variant='h5'>
            {group.name} - {new Date(group.dateTime).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid container style={{ flexGrow: 1, overflowY: 'scroll', maxHeight: '76vh' }}>
          <List>
            {topRatedMovies.map((movie) => {
              return (
                <ListItem key={movie.id}>
                  <ListItemText primary={movie.title} />
                  <ListItemSecondaryAction>
                  {movie.memberRatings ? (Object.values(movie.memberRatings).reduce((value, reduction) => value + reduction, 0) / Object.values(movie.memberRatings).length) : 0}
                  </ListItemSecondaryAction>
                </ListItem>
              )
            })}
          </List>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>
            Share the token with your friends: {group.token}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body1'>
            Members:
          </Typography>
          <List>
            {Object.values(group.nameByMemberId).map((name, i) => {
              return (
                <ListItem key={i}>
                  <ListItemText primary={name} />
                </ListItem>
              )
            })}
          </List>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <BottomButton onAction={this.handleOnRateMovie}>
              Rate Movies
            </BottomButton>
          </Grid>
          <Grid item xs={6}>
            <BottomButton onAction={this.handleDeleteGroup} colorType='secondary'>
              Leave Group
            </BottomButton>
          </Grid>
        </Grid>
      </Grid>
    )
  }

  handleOnRateMovie = () => {
    const { dispatch, group } = this.props
    dispatch(uiActions.changePage('RateMovies', { groupId: group.id }))
  }

  handleDeleteGroup = () => {
    const { dispatch, group } = this.props
    const groupToken = group.token
    dispatch(groupsActions.deleteGroup(groupToken))
    }

}

function mapStateToProps (state) {
  const groupId = state.ui.page.data.groupId
  const group = state.groups.entities[groupId]
  const topRatedMovies = Object.values(group.movies).sort((ma, mb) => {
    const avgRatingA = ma.memberRatings ? (Object.values(ma.memberRatings).reduce((value, reduction) => value + reduction, 0) / Object.values(ma.memberRatings).length) : 0
    const avgRatingB = mb.memberRatings ? (Object.values(mb.memberRatings).reduce((value, reduction) => value + reduction, 0) / Object.values(mb.memberRatings).length) : 0
    return avgRatingB - avgRatingA
  }).slice(0, 5)

  return {
    group,
    topRatedMovies
  }
}

export default connect(mapStateToProps)(GroupDetails)

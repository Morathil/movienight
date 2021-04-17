import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Grid, Typography, Button } from '@material-ui/core/'
import * as uiActions from 'actions/ui'

class GroupDetails extends Component {
  render () {
    const { group, topRatedMovies } = this.props

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h3'>
            {group.name}
          </Typography>
        </Grid>
        <Grid container>
          {topRatedMovies.map((movie) => {
            return (
              <React.Fragment key={movie.id}>
                <Grid item xs={6}>
                  <Typography variant='body1'>
                    {movie.title}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='body1'>
                    {movie.memberRatings ? (Object.values(movie.memberRatings).reduce((value, reduction) => value + reduction, 0) / Object.values(movie.memberRatings).length) : 0}
                  </Typography>
                </Grid>
              </React.Fragment>
            )
          })}
        </Grid>
        <Grid item xs={12}>
        <Typography variant='body1'>
          Share the token with your friends: {group.token}
        </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button variant='contained' color='primary' onClick={this.handleOnRateMovie}>
            Rate Movies
          </Button>
        </Grid>
      </Grid>
    )
  }

  handleOnRateMovie = () => {
    const { dispatch, group } = this.props
    dispatch(uiActions.changePage('RateMovies', { groupId: group.id }))
  }

  handleOnCreateGroup = () => {
    const { dispatch } = this.props
    dispatch(uiActions.changePage('CreateGroup'))
  }

  handleonJoinGroup = () => {
    const { dispatch } = this.props
    dispatch(uiActions.changePage('GroupDetails'))
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

import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Grid, Typography, Button, Card, CardMedia, CardContent, CardActions } from '@material-ui/core/'
import * as uiActions from 'actions/ui'
import * as groupsActions from 'actions/groups'
import BottomButton from 'views/components/BottomButton'
import TopBar from 'views/components/TopBar'

class RateMovies extends Component {
  render () {
    const { movie } = this.props

    if (!movie) {
      return (
        <Grid container>
          <TopBar />
          <Grid item xs={12}>
            <Typography variant='h3'>
              You already voted for all movies! Well done!
            </Typography>
          </Grid>
        </Grid>        
      )
    }

    return (
      <Grid container style={{ minHeight: '100vh' }} direction='column'>
        <TopBar />
        <Grid item xs={12} style={{ flexGrow: 1, overflowY: 'scroll', maxHeight: '76vh' }}>
          <Card>
            <CardMedia style={{ height: '55vh', backgroundSize: 'contain', marginTop: '5px' }} image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {movie.title} - {movie.release_date.slice(0,4)}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {movie.overview}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid container>
          <Grid item xs={3}>
            <BottomButton onAction={this.rateMovie.bind(this, 1)}>
              Rate 1
            </BottomButton>
          </Grid>
          <Grid item xs={3}>
            <BottomButton onAction={this.rateMovie.bind(this, 2)}>
              Rate 2
            </BottomButton>
          </Grid>
          <Grid item xs={3}>
            <BottomButton onAction={this.rateMovie.bind(this, 3)}>
              Rate 3
            </BottomButton>
          </Grid>
          <Grid item xs={3}>
            <BottomButton onAction={this.rateMovie.bind(this, 4)}>
              Rate 4
            </BottomButton>
          </Grid>                                
        </Grid>
      </Grid>
    )
  }

  handleOnCreateGroup = () => {
    const { dispatch } = this.props
    dispatch(uiActions.changePage('CreateGroup'))
  }

  handleonJoinGroup = () => {
    const { dispatch } = this.props
    dispatch(uiActions.changePage('RateMovies'))
  }

  rateMovie = (rating) => {
    const { dispatch, movie, groupId } = this.props
    dispatch(groupsActions.rateMovie(groupId, movie.id, rating))
  }
}

function mapStateToProps (state) {
  const currentUser = state.users.current

  const groupId = state.ui.page.data.groupId
  const group = state.groups.entities[groupId]

  console.log(group)

  return {
    groupId,
    movie: Object.values(group.movies).filter((movie) => {
      return !movie.memberRatings || movie.memberRatings[currentUser.uid] === undefined
    })[0]
  }
}

export default connect(mapStateToProps)(RateMovies)

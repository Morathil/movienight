import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Grid, Typography, Button, ButtonBase, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Card, CardMedia, CardContent,  } from '@material-ui/core/'
import * as uiActions from 'actions/ui'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'

class Home extends Component {
  render () {
    const { groups } = this.props

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant='h4'>
            Movienight
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <List>
          {Object.values(groups).map((group) => {
            const topRatedMovies = Object.values(group.movies).sort((ma, mb) => {
              const avgRatingA = ma.memberRatings ? (Object.values(ma.memberRatings).reduce((value, reduction) => value + reduction, 0) / Object.values(ma.memberRatings).length) : 0
              const avgRatingB = mb.memberRatings ? (Object.values(mb.memberRatings).reduce((value, reduction) => value + reduction, 0) / Object.values(mb.memberRatings).length) : 0
              return avgRatingB - avgRatingA
            })
            return (
              <ListItem key={group.id} style={{ marginBottom: '4px' }} onClick={this.handleShowGroupDetails.bind(this, group.id)}>
                <Card style={{ width: '100%' }}>
                  <CardMedia style={{ height: '15vh', backgroundSize: 'cover', backgroundPosition: '0 20%' }} image={`https://image.tmdb.org/t/p/w500${topRatedMovies[0].backdrop_path}`} />
                  <CardContent>
                    <Typography gutterBottom variant="h6">
                      {group.name}
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
            )
          })}
          </List>
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

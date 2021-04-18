import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Grid, Typography, Button, ButtonBase, List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, Card, CardMedia, CardContent,  } from '@material-ui/core/'
import * as uiActions from 'actions/ui'
import BottomButton from 'views/components/BottomButton'
import TopBar from 'views/components/TopBar'

class Home extends Component {
  render () {
    const { groups } = this.props

    return (
      <Grid container style={{ minHeight: '100vh' }} direction='column'>
        <TopBar />
        <Grid item xs={12} style={{ flexGrow: 1, overflowY: 'scroll', maxHeight: '76vh' }}>
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
                    <Typography gutterBottom variant="h6" style={{ marginBottom: '-6px' }}>
                      {group.name}
                    </Typography>
                    <Typography gutterBottom variant="caption">
                      {new Date(group.dateTime).toLocaleDateString()}
                    </Typography>
                  </CardContent>
                </Card>
              </ListItem>
            )
          })}
          </List>
        </Grid>
        <Grid container>
          <Grid item xs={6}>
            <BottomButton onAction={this.handleOnCreateGroup}>
              Create Group
            </BottomButton>
          </Grid>
          <Grid item xs={6}>
            <BottomButton onAction={this.handleonJoinGroup} colorType='secondary'>
            Join Group
            </BottomButton>
          </Grid>
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

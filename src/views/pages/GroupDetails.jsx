import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Grid, Typography, Button, List, ListItem, ListItemText, ListItemSecondaryAction } from '@material-ui/core/'
import * as uiActions from 'actions/ui'
import * as groupsActions from 'actions/groups'
import BottomButton from 'views/components/BottomButton'
import TopBar from 'views/components/TopBar'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';


class GroupDetails extends Component {
  render () {
    const { group, topRatedMovies } = this.props;

    return (
      <Grid container style={{ minHeight: '100vh' }} direction='column'>
        <TopBar />
        <Grid item xs={12}>
          <Typography variant='h5'>
            {group.name} - {new Date(group.dateTime).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid item style={{ minHeight: '10vh' }} xs={12}>
        {group.description}
        </Grid>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Movie Title</TableCell>
                <TableCell align="right">Rating</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topRatedMovies.map((movie) => {
                return (
                <TableRow key={movie.id}>
                  <TableCell component="th" scope="row">
                    {movie.title}
                  </TableCell>
                  <TableCell>{movie.memberRatings ? (Object.values(movie.memberRatings).reduce((value, reduction) => value + reduction, 0) / Object.values(movie.memberRatings).length) : 0}
                  </TableCell>
                </TableRow>
              )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid item style={{ minHeight: '20vh' }} xs={12}>
          <Typography variant='body1'>
            Share the token with your friends: {group.token}
          </Typography>
        </Grid>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Members</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(group.nameByMemberId).map((name, i) => {
                return (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                </TableRow>
              )
            })}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container>
          <Grid item xs={6}>
            <BottomButton onAction={this.handleOnRateMovie}>
              Rate Movies
            </BottomButton>
          </Grid>
          <Grid item xs={6}>
            <BottomButton onAction={this.handleLeaveGroup} colorType='secondary'>
              Leave Group
            </BottomButton>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  handleOnRateMovie = () => {
    const { dispatch, group } = this.props
    dispatch(uiActions.changePage('RateMovies', { groupId: group.id }))
  }

  handleLeaveGroup = () => {
    const { dispatch, group } = this.props
    const groupToken = group.token
    dispatch(groupsActions.leaveGroup(groupToken))
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

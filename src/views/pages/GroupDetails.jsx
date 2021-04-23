import {
  connect
} from 'react-redux'
import React, {
  Component
} from 'react'
import {
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core/'
import * as uiActions from 'actions/ui'
import BottomButton from 'views/components/BottomButton'
import TopBar from 'views/components/TopBar'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

class GroupDetails extends Component {
  render() {
    const {
      group,
      topRatedMovies
    } = this.props;
    return ( <
      Grid container style = {
        {
          minHeight: '100vh'
        }
      }
      direction = 'column' >
      <
      TopBar / >
      <
      Grid item xs = {
        12
      } >
      <
      Typography variant = 'h3' > {
        group.name
      } - {
        new Date(group.dateTime).toLocaleDateString()
      } <
      /Typography> <
      /Grid> <
      Grid item style = {
        {
          minHeight: '10vh'
        }
      }
      xs = {
        12
      } > {
        group.description
      } <
      /Grid> <
      TableContainer component = {
        Paper
      } >
      <
      Table aria - label = "simple table" >
      <
      TableHead >
      <
      TableRow >
      <
      TableCell > Movie Title < /TableCell> <
      TableCell align = "right" > Rating < /TableCell> <
      /TableRow> <
      /TableHead> <
      TableBody > {
        topRatedMovies.map((movie) => {
          return ( <
            TableRow key = {
              movie.id
            } >
            <
            TableCell component = "th"
            scope = "row" > {
              movie.title
            } <
            /TableCell> <
            TableCell > {
              movie.memberRatings ? (Object.values(movie.memberRatings).reduce((value, reduction) => value + reduction, 0) / Object.values(movie.memberRatings).length) : 0
            } <
            /TableCell> <
            /TableRow>
          )
        })
      } <
      /TableBody> <
      /Table> <
      /TableContainer> <
      Grid item xs = {
        12
      } >
      <
      Typography variant = 'body1' >
      Share the token with your friends: {
        group.token
      } <
      /Typography> <
      /Grid> <
      Grid item xs = {
        12
      } >
      <
      Typography variant = 'body1' >
      Members:
      <
      /Typography> <
      List > {
        Object.values(group.nameByMemberId).map((name, i) => {
          return ( <
            ListItem key = {
              i
            } >
            <
            ListItemText primary = {
              name
            }
            /> <
            /ListItem>
          )
        })
      } <
      /List> <
      /Grid> <
      Grid item xs = {
        12
      } >
      <
      BottomButton onAction = {
        this.handleOnRateMovie
      } >
      Rate Movies <
      /BottomButton> <
      /Grid> <
      /Grid>
    );
  }

  handleOnRateMovie = () => {
    const {
      dispatch,
      group
    } = this.props
    dispatch(uiActions.changePage('RateMovies', {
      groupId: group.id
    }))
  }
}

function mapStateToProps(state) {
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
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as uiActions from 'actions/ui'
import { Box, Grid, Typography, IconButton } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import theme from 'src/theme'

class TopBar extends Component {
  render () {
    const topHeadline = this.getTopHeadline()

    return (
      <Grid container alignItems='center'>
        <Grid item xs={topHeadline ? 3 : 6}>
          {this.renderLeftIcon()}
        </Grid>
        {topHeadline ? (
          <Grid item xs={6}>
            <Box textAlign='center'>
              <Typography variant='h5'>
                {topHeadline}
              </Typography>
            </Box>
          </Grid>
          ) : undefined
        }
        <Grid item xs={topHeadline ? 3 : 6}>
          <Box textAlign='right'>
            {this.renderRightIcons()}
          </Box>
        </Grid>
      </Grid>
    )
  }

  renderLeftIcon () {
    const { page } = this.props

    // if (page === 'Home') {
    //   return (
    //     <div style={{ backgroundImage: `url(${movienightLogo})`, width: '36px', height: '36px', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', margin: '14px', opacity: 0.54 }} />
    //   )
    // }

    return (
      <IconButton onClick={this.handleShowHome}>
        <HomeIcon fontSize='large' />
      </IconButton>
    )
  }

  renderRightIcons () {
    let rightIcons = []

    // if (isOffline) {
    //   rightIcons.push((
    //     <Grid key='offline'>
    //       <IconButton onClick={() => {}} style={{ padding: '6px' }}>
    //         <PortableWifiOff />
    //       </IconButton>
    //     </Grid>
    //   ))
    // }

    return (
      <Grid container justify='flex-end'>
        {rightIcons}
      </Grid>
    )
  }

  getTopHeadline () {
    const { page } = this.props

    switch (page.type) {
      case 'Home': return 'Movienight'
      case 'CreateGroup': return 'Create a Group'
      case 'JoinGroup': return 'Join a Group'
      case 'GroupDetails': return 'Group Details'
      case 'RateMovies': return 'Rate the Movies'
      default: return undefined
    }
  }

  handleShowHome = () => {
    const { dispatch } = this.props
    dispatch(uiActions.changePage('Home'))
  }
}

function mapStateToProps (state) {
  return {
    page: state.ui.page
  }
}

export default connect(mapStateToProps)(TopBar)

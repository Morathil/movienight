import { connect } from 'react-redux'
import React, { Component } from 'react'
import { Grid, Typography, Button, FormControl, InputLabel, Select, MenuItem, TextField } from '@material-ui/core/'
import * as uiActions from 'actions/ui'
import * as groupsActions from 'actions/groups'
import BottomButton from 'views/components/BottomButton'
import TopBar from 'views/components/TopBar'

class CreateGroup extends Component {
  state = {
    selectedGenreIds: undefined,
    datetime: new Date().getTime(),
    groupName: undefined,
    groupDescription: undefined
  }

  render () {
    const { genreEntities } = this.props
    const { selectedGenreIds, datetime, groupName, groupDescription } = this.state
    const formattedDatetime = new Date(new Date(datetime).toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]

    return (
      <Grid container style={{ minHeight: '100vh' }} direction='column'>
        <TopBar />
        <Grid item xs={11} style={{ flexGrow: 1, overflowY: 'scroll', maxHeight: '76vh' }}>
          <TextField style={{ margin: '5px' }} onChange={this.handleOnChange} fullWidth id='groupName' label='Group Name' value={groupName || ''} />
          <TextField
          style={{ margin: '12px' }} onChange={this.handleOnChange} id="groupDescription" fullWidth multiline
          rows={4} placeholder="Whats your movienight about ?"
          />
          <TextField style={{ margin: '5px' }} onChange={this.handleOnChange} fullWidth required id='datetime' label={'Date'} type='datetime-local' value={formattedDatetime} />
          <FormControl style={{ margin: '5px' }} fullWidth={true}>
            <InputLabel>Genre</InputLabel>
            <Select
              id='genre'
              fullWidth={true}
              value={selectedGenreIds || []}
              multiple={true}
              onChange={this.handleOnSelectedGenreChange}>
                {Object.values(genreEntities).map((genre) => {
                  return <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
                })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <BottomButton onAction={this.handleOnCreateGroup}>
            Create Group
          </BottomButton>
        </Grid>
      </Grid>
    )
  }

  handleOnChange = (event) => {
    const value = event.target.id === 'datetime' ? new Date(event.target.value).getTime() : event.target.value
    this.setState({ [event.target.id]: value })
  }

  handleOnSelectedGenreChange = (event) => {
    this.setState({ selectedGenreIds: event.target.value })
  }

  handleOnCreateGroup = () => {
    const { dispatch } = this.props
    const { selectedGenreIds, datetime, groupName, groupDescription } = this.state
    dispatch(groupsActions.createGroup(groupName, datetime, selectedGenreIds, groupDescription))
  }

  handleonJoinGroup = () => {
    const { dispatch } = this.props
    dispatch(uiActions.changePage('JoinGroup'))
  }
}

function mapStateToProps (state) {
  return {
    currentUser: state.users.current,
    genreEntities: state.movies.genres.entities
  }
}

export default connect(mapStateToProps)(CreateGroup)

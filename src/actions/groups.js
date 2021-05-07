import * as apiServices from 'services/api'
import * as uiActions from 'actions/ui'

export function createGroup (groupName, dateTime, genreIds) {
  return async (dispatch, getState) => {
    const currentUser = getState().users.current
    const externalResponse = await apiServices.fetchMoviesFromExternal(genreIds)
    const movies = JSON.parse(externalResponse).results
    const groupId = await apiServices.createGroup(currentUser, movies, groupName, dateTime)
    await dispatch(fetchGroupMemberships())

    dispatch(uiActions.changePage('GroupDetails', { groupId }))
  }
}

export function leaveGroup (groupToken) {
  return async (dispatch, getState) => {
    const currentUser = getState().users.current
    const groups = await apiServices.leaveGroup(groupToken, currentUser)
    dispatch(uiActions.changePage('Home'))
    await dispatch(fetchGroupMemberships())
  }
}

export function joinGroup (groupToken) {
  return async (dispatch, getState) => {
    const currentUser = getState().users.current
    const groupId = await apiServices.joinGroup(currentUser, groupToken)
    await dispatch(fetchGroupMemberships())

    dispatch(uiActions.changePage('GroupDetails', { groupId }))
  }
}

export function fetchGroupMemberships () {
  return async (dispatch, getState) => {
    const currentUser = getState().users.current
    const groups = await apiServices.fetchGroupMemberships(currentUser)
    dispatch({ type: 'GROUPS_MEMBERSHIPS_RECEIVED', payload: { groups } })
  }
}

export function rateMovie (groupId, movieId, rating) {
  return async (dispatch, getState) => {
    const currentUser = getState().users.current
    await apiServices.rateMovie(currentUser, groupId, movieId, rating)
    await dispatch(fetchGroupMemberships()) // improve by only updating specific movie in state
  }
}

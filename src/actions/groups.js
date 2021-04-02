import * as apiServices from 'services/api'

export function createGroup (genreIds) {
  return async (dispatch, getState) => {
    const currentUser = getState().users.current
    const externalResponse = await apiServices.fetchMoviesFromExternal(genreIds)
    const movies = JSON.parse(externalResponse).results
    await apiServices.createGroup(currentUser, movies)
    await dispatch(fetchGroupMemberships())

    // dispatch({ type: 'GROUPS_CREATED' })
  }
}

export function joinGroup (groupToken) {
  return async (dispatch, getState) => {
    const currentUser = getState().users.current
    await apiServices.joinGroup(currentUser, groupToken)
    await dispatch(fetchGroupMemberships())
  }
}

export function fetchGroupMemberships () {
  return async (dispatch, getState) => {
    const currentUser = getState().users.current
    const groups = await apiServices.fetchGroupMemberships(currentUser)
    dispatch({ type: 'GROUPS_MEMBERSHIPS_RECEIVED', payload: { groups } })
  }
}
import * as groupsActions from 'actions/groups'

export function loggedIn (user) {
  return (dispatch) => {
    dispatch({ type: 'USERS_CURRENT_LOGIN', payload: { user } })

    dispatch(groupsActions.fetchGroupMemberships())
  }
}

export function loggedOut () {
  return (dispatch) => {
    dispatch({ type: 'USERS_CURRENT_LOGOUT' })
  }
}
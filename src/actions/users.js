export function loggedIn (user) {
  return (dispatch) => {
    dispatch({ type: 'USERS_CURRENT_LOGIN', payload: { user } })
  }
}

export function loggedOut () {
  return (dispatch) => {
    dispatch({ type: 'USERS_CURRENT_LOGOUT' })
  }
}
import firebase from 'firebase'
import * as usersActions from 'actions/users'

let dispatch

export function initialize (d) {
  dispatch = d

  const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
    if (user) {
      loggedIn(user)
    } else {
      loggedOut()
    }
  });
}

// HELPERS

function loggedIn (user) {
  dispatch(usersActions.loggedIn(user))
}

function loggedOut () {
  dispatch(usersActions.loggedOut())
}
import firebase from 'firebase'

let database

export function initialize () {
  database = firebase.firestore()
}

// GROUPS

export function createGroup (currentUser) {
  return database.collection('groups').add({
    token: 'generatedToken', // TODO: generate
    admin: currentUser.uid,
    members: [currentUser.uid],
    movies: {
      ratings: {},
      list: []
    }
  }).then((docRef) => {
    console.log(docRef)
  }).catch((error) => {
    console.warn(error)
  })
}

export function joinGroup (currentUser, groupToken) {
  return database.collection('groups').where('token', '==', groupToken)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot) {
        console.log(querySnapshot)
        const doc = querySnapshot.forEach((doc) => {
          console.log(doc)
          database.collection('groups').doc(doc.id)
            .set({
              members: [...doc.data().members, currentUser.uid]
            }, { merge: true })
            .then(() => {
              console.log('success write')
            }).catch((error) => {
              console.warn(error)
            })
        })
      }
    })
}

export function fetchGroupMemberships (currentUser) {
  return database.collection('groups').where('members', 'array-contains', currentUser.uid)
    .get()
    .then((querySnapshot) => {
      if (querySnapshot) {
        console.log(querySnapshot)
        const doc = querySnapshot.forEach((doc) => {
          console.log(doc.data())
        })
      }
    })
}

export function rateMovie (currentUser, groupId, movieId, rating) {
  return database.collection('groups').doc(groupId)
    .set({
        movies: {
          ratings: {
            [movieId]: {
              [currentUser.uid]: rating
            }
          }
        }
    }, { merge: true }).then(() => {
      console.log('success write')
    }).catch((error) => {
      console.warn(error)
    })
}

// MOVIES

export function fetchMovies (movieIds) {
  return Promise.all(
    movieIds.map((movieId) => {
      return database.collection('movies').doc(movieId).get()
    })
  ).then((response) =>{
    response.forEach((r) => {
      console.log(r.data())
    })
  })
}
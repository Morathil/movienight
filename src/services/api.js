import firebase from 'firebase'
import theMovieDb from 'themoviedb-javascript-library'
import { v4 as uuidv4 } from 'uuid'

theMovieDb.common.api_key = 'daa66f5210f8a8701152ec93f60ae169'
window.theMovieDb = theMovieDb

let database

export function initialize () {
  database = firebase.firestore()
}

// GROUPS

export function createGroup (currentUser, movies, groupName, dateTime, groupDescription) {
  let persistedMovies = {}

  movies.forEach((movie) => {
    persistedMovies[movie.id] = movie
  })

  return database.collection('groups').add({
    name: groupName,
    description: groupDescription,
    dateTime: dateTime,
    token: uuidv4(),
    admin: currentUser.uid,
    members: [currentUser.uid],
    nameByMemberId: {
      [currentUser.uid]: currentUser.displayName
    },
    movies: persistedMovies
  }).then((response) => {
    return response.id
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
        return new Promise((resolve, reject) => {
          querySnapshot.forEach((doc) => {
            console.log(doc)
            database.collection('groups').doc(doc.id)
              .set({
                members: [...doc.data().members, currentUser.uid],
                nameByMemberId: {
                  [currentUser.uid]: currentUser.displayName
                },
              }, { merge: true })
              .then(() => {
                console.log('success write')
                resolve(doc.id)
              }).catch((error) => {
                console.warn(error)
              })
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
        let groups = []
        querySnapshot.forEach((doc) => {
          if (doc.exists) {
            let data = doc.data()
            data.id = doc.id
            groups.push(data)
          }
        })

        return groups
      }

      return []
    })
}

export function rateMovie (currentUser, groupId, movieId, rating) {
  return database.collection('groups').doc(groupId)
    .set({
        movies: {
          [movieId]: {
            memberRatings: {
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

export function fetchMovieGenres () {
  return new Promise((resolve, reject) => {
    theMovieDb.genres.getMovieList({}, resolve, reject)
  })
}

export function fetchMoviesFromExternal (genreIds) {
  return new Promise((resolve, reject) => {
    theMovieDb.discover.getMovies({
      with_genres: genreIds.join(',')
    }, resolve, reject)
  })
}

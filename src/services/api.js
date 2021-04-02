import firebase from 'firebase'

let database

export function initialize () {
  database = firebase.firestore()
}

export function createGroup (currentUser) {
  database.collection('groups').add({
    token: 'generatedToken', // TODO: generate
    admin: currentUser.uid,
    members: [currentUser.uid]
  }).then((docRef) => {
    console.log(docRef)
  }).catch((error) => {
    console.warn(error)
  })
}

export function joinGroup (currentUser, groupToken) {
  database.collection('groups').where('token', '==', groupToken)
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
  database.collection('groups').where('members', 'array-contains', currentUser.uid)
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
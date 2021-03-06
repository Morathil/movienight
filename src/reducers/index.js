import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux-immer'
import produce from 'immer'
import thunk from 'redux-thunk'

// Reducers
import { movies } from './movies'
import { users } from './users'
import { groups } from './groups'
import { ui } from './ui'

const composes = [applyMiddleware(thunk)]

if (!ENV.NATIVE && window.__REDUX_DEVTOOLS_EXTENSION__) {
  composes.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}

export const store = createStore(
  combineReducers(produce, {
    movies,
    users,
    groups,
    ui
  }),
  compose(...composes)
)

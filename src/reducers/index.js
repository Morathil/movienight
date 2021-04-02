import { createStore, applyMiddleware, compose } from 'redux'
import { combineReducers } from 'redux-immer'
import produce from 'immer'
import thunk from 'redux-thunk'

// Reducers
import { movies } from './movies'


const composes = [applyMiddleware(thunk)]

if (ENV.BROWSER && window.__REDUX_DEVTOOLS_EXTENSION__) {
  composes.push(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
}

export const store = createStore(
  combineReducers(produce, {
    movies
  }),
  compose(...composes)
)

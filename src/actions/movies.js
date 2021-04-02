import * as apiServices from 'services/api'

export function fetchGenres () {
  return async (dispatch, getState) => {
    const genres = await apiServices.fetchMovieGenres().genre
    dispatch({ type: 'MOVIES_GENRES_RECEIVE', payload: { genres }})
  }
}

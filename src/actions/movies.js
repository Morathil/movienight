import * as apiServices from 'services/api'

export function fetchGenres () {
  return async (dispatch, getState) => {
    const response = await apiServices.fetchMovieGenres()
    const genres = JSON.parse(response).genres
    dispatch({ type: 'MOVIES_GENRES_RECEIVE', payload: { genres }})
  }
}

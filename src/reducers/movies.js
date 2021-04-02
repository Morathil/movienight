const initialState = {
  genres: {
    entities: {}
  }
}

export const movies = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVIES_GENRES_RECEIVE':
      action.payload.genres.forEach((genre) => {
        state.genres.entities[genre.id] = action.payload.genre
      })
      return state

    default:
      return state
  }
}
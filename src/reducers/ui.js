const initialState = {
  page: {
    type: 'Home'
  }
}

export const ui = (state = initialState, action) => {
  switch (action.type) {
    case 'PAGE_CHANGE':
      state.page = action.payload.page
      return state

    default:
      return state
  }
}
const initialState = {
  current: undefined
}

export const users = (state = initialState, action) => {
  switch (action.type) {
    case 'USERS_CURRENT_LOGIN':
      state.current = action.payload.user
      return state

    default:
      return state
  }
}
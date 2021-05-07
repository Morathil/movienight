const initialState = {
  entities: {}
}

export const groups = (state = initialState, action) => {
  switch (action.type) {
    case 'GROUPS_CREATED':
      state.entities[action.payload.group.id] = action.payload.group
      return state

    case 'GROUPS_MEMBERSHIPS_RECEIVED':
      state.entities = initialState.entities
      action.payload.groups.forEach((group) => {
        state.entities[group.id] = group
      })
      return state

    default:
      return state
  }
}

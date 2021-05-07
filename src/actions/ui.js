export function changePage (type, data) {
  return (dispatch) => {
    dispatch({ type: 'PAGE_CHANGE', payload: { page: { type, data } } })
  }
}

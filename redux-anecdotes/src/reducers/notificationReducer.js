const initialState = null

export const setNotification= (content, time) => {
  return async dispatch => {
    var timeoutID
    dispatch({
      type: 'SET_NOTIFICATION',
      data: content
    })
    clearTimeout(timeoutID)
    timeoutID = setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, time*1000)
  }
}

export const clearNotification = () => {
  return{
    type: 'CLEAR_NOTIFICATION'
  }
}

const notificationReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_NOTIFICATION':
    return action.data

  case 'CLEAR_NOTIFICATION':
    return null

  default:
    return state
  }
}

export default notificationReducer
import anecdoteService from '../services/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const vote = (content) => {
  return async dispatch => {
    await anecdoteService.addVote(content)
    dispatch({
      type:  'VOTE',
      data: {content}
    })
}
}

export const newAnecdote = (content) => {
  const newAnec = asObject(content)
  return async dispatch => {
    const add = await anecdoteService.createNew(newAnec)
    dispatch({
      type: 'NEW-ANECDOTE',
      data: newAnec,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecs = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecs,
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  const sortAnecs = () => {
    let anecs = state.sort((a,b) => (a.votes > b.votes) ? -1 : 1)
    return anecs
  }

  switch(action.type){
    case 'VOTE':
      const anecdoteToChange = state.find(a => a.id === action.data.content)
      const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
      state = state.map(a => a.id !== action.data.content ? a : changedAnecdote)
      state = sortAnecs()
      return state
    case 'NEW-ANECDOTE':
      state = state.concat(action.data)
      state = sortAnecs()
      return state
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer
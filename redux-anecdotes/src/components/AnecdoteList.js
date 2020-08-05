import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => {
      if (state.filter === '' || !state.filter) {
        return state.anecdote
      } else {
          return state.anecdote.filter((anec) =>
              anec.content.toLowerCase().includes(state.filter.toLowerCase()))
      }
    })
  
  const dispatch = useDispatch()

  const setVote = async (anecdote) => {
      dispatch(vote(anecdote.id))
      dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
    }
  
  return (
  <div>
      {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
          <div>
              {anecdote.content}
          </div>
          <div>
              has {anecdote.votes} votes
              <button onClick={() => setVote(anecdote)} type = 'VOTE'>vote</button>
          </div>
      </div>
    )}
  </div>
  )
}

export default AnecdoteList
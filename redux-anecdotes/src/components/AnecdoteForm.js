import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const handleNew = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(newAnecdote(content))
      }
    
    return (
        <div>
        <h2>create new</h2>
        <form onSubmit = { handleNew }>
            <div>
            <input  name = 'anecdote' />
            <button type = 'submit' >create</button>
            </div>
        </form>
        </div>
        )
}

export default AnecdoteForm
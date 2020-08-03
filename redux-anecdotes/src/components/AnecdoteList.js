import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {

    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    return (
    <div>
        {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes} votes
                <button onClick={() => dispatch(vote(anecdote.id))} type = 'VOTE'>vote</button>
            </div>
        </div>
      )}
    </div>
    )
}

export default AnecdoteList
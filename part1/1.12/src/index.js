import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [scores, setScores] = useState(new Array(anecdotes.length).fill(0))
  
  


  function indexOfMax(arr) {

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}
  console.log(scores)
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>has {scores[selected]} votes</p>
      <AnecButton name = "next anecdote" value = {selected} set = {setSelected}></AnecButton>
      <VoteButton name = 'vote' value = {scores} select = {selected} set = {setScores}/>
      <h1>Anecdote with the most votes</h1>
      <p>{props.anecdotes[indexOfMax(scores)]}</p>

    </div>
  )
}

const VoteButton = (props) => {

  const handleVote = () => {
    let copy = props.value
    copy[props.select] += 1
    return copy
  }

  return(
    <button onClick = {() => props.set(handleVote)}>{props.name}</button>
  )
}

const AnecButton = (props) => {
  //This loop prevents app from freezing if two same numbers appear
  let rand = props.value
  while(props.value === rand){
    rand = Math.floor(Math.random() * Math.floor(anecdotes.length));
  }

  return(
      <button onClick = {() => props.set(rand)}>{props.name}</button>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  '"Kello on juuri sen verran kuin mitä se näyttää silloin kun sinä katsot sitä" -Michael Cosol'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const totalVotes = good + neutral + bad
  
  if(totalVotes === 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    ) 
  } else return(
  <div>
    <table>
      <tbody>
        <tr><StatisticLine text = "good" value = {good}/></tr>
        <tr><StatisticLine text = "neutral" value = {neutral}/></tr>
        <tr><StatisticLine text = "bad" value = {bad}/></tr>
        <tr><StatisticLine text = "all" value = {good+neutral+bad}/></tr>
        <tr><StatisticLine text = "average" value = {(good+bad*-1)/(totalVotes)}/></tr>
        <tr><StatisticLine text = "positive"
        value = {(good/(totalVotes)*100)}
        procent = "%"/></tr>
      </tbody>
    </table>
  </div>
  )
}

const StatisticLine = (props) =>{
  return(
    <React.Fragment>
    <td>{props.text}</td>
    <td>{props.value}{props.procent}</td>
    </React.Fragment>
  )
}

const Button = (props) => {
  return(
      <button onClick = {() => props.set(props.value + 1)}>{props.name}</button>
  )
}



const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button name = "good" value = {good} set = {setGood}></Button>
      <Button name = "neutral" value = {neutral} set = {setNeutral}></Button>
      <Button name = "bad" value = {bad} set = {setBad}></Button>
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad ={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad
  const totalVotes = good + neutral + bad
  
  if(totalVotes == 0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    ) 
  } else return(
  <div>
    <StatisticLine text = "good" value = {good}/>
    <StatisticLine text = "neutral" value = {neutral}/>
    <StatisticLine text = "bad" value = {bad}/>
    <StatisticLine text = "all" value = {good+neutral+bad}/>
    <StatisticLine text = "average" value = {(good+bad*-1)/(totalVotes)}/>
    <StatisticLine text = "positive"
      value = {(good/(totalVotes)*100)}
      procent = "%"/>
  </div>
  )
}

const StatisticLine = (props) =>{
  return(
      <table>
        <tbody>
          <tr>
            <td>{props.text}</td> 
            <td>{props.value}</td>
            <td>{props.procent}</td>
          </tr>
        </tbody>
      </table>
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
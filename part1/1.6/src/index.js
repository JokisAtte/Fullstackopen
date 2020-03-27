import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClick =() => {
    console.log('klik');
  }

  return (
    <div>
      <button onClick = {handleClick}>asd</button> 
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
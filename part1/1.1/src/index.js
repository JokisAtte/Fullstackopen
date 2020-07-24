import React from 'react';
import ReactDOM from 'react-dom';

//Komponentti Header renderöi kurssin nimen
const Header = (props) => {
  return(
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

//Komponentti Content renderöi kurssin osat ja tehtävämäärät
const Content = (props) => {
  return(
    <div>
      <p>
        {props.name} {props.exercises}
      </p>
    </div>
  )
}

//Komponentti Total renderöi tehtävien yhteismäärän
const Total = (props) => {
  return(
    <div>
      <p>
        Number of exercises {props.total}
      </p>
    </div>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header name={Course} />
      <Content name={part1} exercises={exercises1}/>
      <Content name={part2} exercises={exercises2}/>
      <Content name={part3} exercises={exercises3}/>
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
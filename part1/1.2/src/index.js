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
      <Part name={props.names[0]} exercises={props.exercises[0]}/>
      <Part name={props.names[1]} exercises={props.exercises[1]}/>
      <Part name={props.names[2]} exercises={props.exercises[2]}/>
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

const Part = (props) => {
  return(
      <div>
        <p>
          {props.name} {props.exercises}
        </p>
      </div>
  )
}

const App = () => {
    const course = 'Half Stack application development'
    const parts = [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  

  return (
    <div>
      <Header name={course} />
      <Content names = {[parts[0].name, parts[1].name, parts[2].name]}
      exercises = {[parts[0].exercises, parts[1].exercises, parts[2].exercises]}/>
      <Total total = {parts[0].exercises + parts[1].exercises +parts[2].exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
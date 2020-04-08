import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const parts = course.parts
  var totalParts = parts.reduce((sum,part) => sum + part.exercises, 0)
  return(
    <p>Number of exercises {totalParts}</p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part,i) =>
        <Part key  = {i} part = {part}/>
      )}
    </div>
  )
}

const Course = ({ course }) => {
  console.log(course)
  return(
    <div>
      <Header course = {course}>{course.name}</Header>
      <Content course = {course}></Content>
      <Total course = {course}></Total>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course = {course}></Course>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
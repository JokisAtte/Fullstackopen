import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Total = ({ course }) => {
  const parts = course.parts
  var totalParts = parts.reduce((sum,part) => sum + part.exercises, 0)
  return(
    <b>Number of exercises {totalParts}</b>
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
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course,i) =>
        <Course key = {i} course = {course}/>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
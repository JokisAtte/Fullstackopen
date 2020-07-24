import React from 'react';


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

export default Course
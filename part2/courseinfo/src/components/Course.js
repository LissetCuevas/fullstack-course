import React from 'react'

const Header = (props) => {
  return (
    <>
      <h2>{props.course}</h2>
    </>
  )
}

const Part = (props) => {
  return(
    <>
      <p key={props.key}>
        {props.name} {props.exercises}
      </p>
    </>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
    </>
  )
}

const Total = ({parts}) => {
    let total = parts.reduce((acum,part) => acum + part.exercises , 0);
    return (
      <>
        <p><b>Number of exercises {total}</b></p>
      </>
    )
  }

  
const Course = ({course}) => {
  return (
    <div>
      <Header key={course.id} course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course
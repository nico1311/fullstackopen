import React from 'react';

const Header = ({course}) => {
  return <h2>{course}</h2>
}

const Part = ({name, exercises}) => {
  return <p>{name} {exercises}</p>
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises} />)}
      <p><b>Total of {parts.reduce((sum, item) => sum + item.exercises, 0)} exercises</b></p>
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export { Header, Part, Content, Course };

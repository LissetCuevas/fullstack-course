import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({name, handleClick}) => (
  <button onClick={handleClick}>{name}</button>
)

const Anecdote = (props) => {
  return(
    <>
      <h1>{props.title}</h1>
      <p>{props.anecdotes[props.position]}</p>
      <p>has {props.points[props.position]} votes</p>
    </>
  )
}

const App = (props) => {
  const zerosArray = new Array(6+1).join('0').split('').map(parseFloat)

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(zerosArray)

  const setToRandom = () => () => {
    setSelected(Math.floor(Math.random() * Math.floor(6)))
  }

  const addPointTo = (position) => () => {
    const copy = [...points]
    copy[position] += 1 
    return(
      setPoints(copy)
    )
  }

  return (
    <div>
      <Anecdote title="Anecdote of the day" 
                anecdotes={props.anecdotes} 
                points={points} 
                position={selected}
      />
      <Button name="vote" handleClick={addPointTo(selected)}/>
      <Button name="next anecdote" handleClick={setToRandom()}/>

      <Anecdote title="Anecdote with most votes" 
                anecdotes={props.anecdotes} 
                points={points} 
                position={points.indexOf(Math.max.apply(null, points))}
      />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
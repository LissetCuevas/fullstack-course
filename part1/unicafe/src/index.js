import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({text}) => (<h1>{text}</h1>)
const Button = ({text,handleClick}) => (<button onClick={handleClick}>{text}</button>)
const Statistic = ({name,number}) => (<p>{name} {number}</p>)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = (value) => () => {setGood(value)}
  const addNeutral = (value) => () => {setNeutral(value)}
  const addBad = (value) => () => {setBad(value)}

  return (
    <div>

      <Title text="give feedback"/>

      <Button text="good" handleClick={addGood(good + 1)}/>
      <Button text="neutral" handleClick={addNeutral(neutral + 1)}/>
      <Button text="bad" handleClick={addBad(bad + 1)}/>

      <Title text="statistics"/>

      <Statistic name="good" number={good}/>
      <Statistic name="neutral" number={neutral}/>
      <Statistic name="bad" number={bad}/>
      <Statistic name="all" number={good + neutral + bad}/>
      <Statistic name="average" number={(good - bad) / (good + neutral + bad)}/>
      <Statistic name="positive" number={good * 100 / (good + neutral + bad)}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
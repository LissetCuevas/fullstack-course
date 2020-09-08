import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Title = ({text}) => (
  <h1>{text}</h1>
)

const Button = ({text,handleClick}) => (
  <button onClick={handleClick}>{text}</button>
)

const Statistic = ({name,value}) =>{ 
  value = name === "positive" ? value + '%' : value
  return(
    <>
      <td>{name}</td>
      <td>{value}</td>
    </>
  )
}
const Statistics = ({good,neutral,bad}) =>{
  if (good || neutral || bad){
    return (
      <div>
        <table>
          <tbody>
            <tr><Statistic name="good" value={good}/></tr>
            <tr><Statistic name="neutral" value={neutral}/></tr>
            <tr><Statistic name="bad" value={bad}/></tr>
            <tr><Statistic name="all" value={good + neutral + bad}/></tr>
            <tr><Statistic name="average" value={(good - bad) / (good + neutral + bad)}/></tr>
            <tr><Statistic name="positive" value={good * 100 / (good + neutral + bad)}/></tr>
          </tbody>
        </table>
      </div>
    )
  }else{
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
}

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

      <Statistics good={good} neutral={neutral} bad={bad}/>
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
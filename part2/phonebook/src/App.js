import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = (props) =>( 
  <div>
    Filter shown with: <input value={props.filter} onChange={props.handleFilterChange}></input>
  </div>
)

const PersonForm = (props) => (
  <form onSubmit={props.addPerson}>
    <div>
      Name: <input value={props.newName} onChange={props.handleNameChange}/>
    </div>
    <div>
      Number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
    </div>
    <div>
      <button type="submit">Add</button>
    </div>
  </form>
)

const Person = (props) => (
  <p key={props.person.name}>
    <b>{props.person.name}</b>: {props.person.number}
  </p>
)

const Persons = (props) => (
  <div>
    {props.persons.map(person => 
      <Person key={person.name} person={person}/>
    )}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')  

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response)
        setPersons(response.data)
      })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    if(uniqueName(newName)){
      const newPerson = {
        name : newName,
        number : newNumber
      }
      setPersons(persons.concat(newPerson))
    }
  }

  const handleNameChange = (event) => {
    uniqueName(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const uniqueName = (newName) => {
    if(!persons.every(person => person.name !== newName)){
      alert(`${newName} is already added to phonebook`)
      return false
    }
    return true
  }

  const filteredPersons = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      
      <h2>Add a new</h2>
      <PersonForm 
        addPerson={addPerson}
        newName={newName} 
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App
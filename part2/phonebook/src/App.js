import React, { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')  

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
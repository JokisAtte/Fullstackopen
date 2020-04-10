import React, { useState } from 'react'

const Person = (props) => {
    return(
        <p>
            {props.name} {props.phone}
        </p>
    )
}

const PersonsForm = (props) => {
  const toShow = props.persons.filter(person => person.name.toUpperCase().includes(props.search.toUpperCase()) === true)
  return(
    <div>
    <h2>Numbers</h2>
    {toShow.map((person) => <Person key = {person.name} name = {person.name} phone = {person.phone}/>)}
    </div>
  )
}

const FilterForm =(props) => {
  return(
    <div>
    filter shown with: <input value = {props.newSearch} onChange = {props.onChange}/>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ])
  const [newName, setNewName ] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addName = (event) => {
    event.preventDefault()

    const personObject = {
        name: newName,
        phone: newPhone
      }

    const names = persons.map(person => person.name)
    if(!names.includes(newName)){
        setPersons(persons.concat(personObject))
    } else {
        window.alert(`${newName} is already added to phonebook`)
    }
    setNewName('')
    setNewPhone('')
  }

  const handleNewName = (event) =>{
    setNewName(event.target.value)
  }

  const handleNewPhone = (event) => {
      setNewPhone(event.target.value)
  }

  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
        <FilterForm value = {newSearch} onChange = {handleNewSearch}/>
      <h2>add a new</h2>
      <form onSubmit = {addName}>
        <div>
          name: <input value ={newName} onChange ={handleNewName} />
        </div>
        <div>
            number: <input value = {newPhone} onChange = {handleNewPhone}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <PersonsForm persons = {persons} search = {newSearch}/>
    </div>
  )
}

export default App
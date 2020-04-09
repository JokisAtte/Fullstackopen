import React, { useState } from 'react'

const Person = (props) => {
    return(
        <p>
            {props.name} {props.phone}
        </p>
    )
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
    phone: '112'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log(newName)

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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <h2>Numbers</h2>
        {persons.map((person) =>
            <Person key = {person.name} name = {person.name} phone = {person.phone}/>
        )}
    </div>
  )

}

export default App
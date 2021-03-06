import React, { useState, useEffect } from 'react'
import './index.css'
import personService from './services/persons'


const Person = (props) => {
  return(
      <p>
          {props.name} {props.phone}
          <DeleteButton id = {props.id} name = {props.name} del={props.del} />
      </p>
    )
}

const DeleteButton = (props) => {
  const call = () => {
    props.del(props)
  }
  return(
    <button onClick = {call}>delete</button>
  )
}

const Notification = ({message}) => {
  if (message === '') {
    return null
  }

  return(
    <div className="notification">
      {message}
    </div>
  )
}

const Error = ({message}) => {
  if (message === ''){
    return null
  }

  return(
    <div className = "error">
      {message}
    </div>
  )
}

const PersonsForm = (props) => {
  const toShow = props.persons.filter(person =>
    person.name.toUpperCase().includes(props.search.toUpperCase()) === true)
  return(
    <div>
    <h2>Numbers</h2>
    {toShow.map((person) => 
    <Person 
      key = {person.name} 
      id = {person.id} 
      name = {person.name} 
      phone = {person.number}
      del = {props.del}
    />)}
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
  const [persons, setPersons] = useState([])
  const [newName, setNewName ] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [notification, setNotification] = useState('')
  const [errormsg, setErrormsg] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
    })
  },[])

  //Deletes a contact
  const handleDelete = (person) => {
    let wantToDelete = window.confirm(`Delete ${person.name}?`)
    if(wantToDelete){
      personService
        .deleteContact(person.id)
        .then(() => {
          personService.getAll()
            .then(response => {
              setPersons(response.data)
            })
            setNotification(`${person.name} deleted`)
        })
        .catch(error => {
          setErrormsg(`information of ${person.name} has already been deleted from the server`)
          setTimeout( () => {
            setErrormsg('')
          }, 3000)
        })
        setTimeout(() => {
          setNotification('')
        },3000)
    }
  }

  //This handles new contacts
  const addName = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newPhone
      }

    const names = persons.map(person => person.name)
    if(!names.includes(newName)){
      console.log('lisätään ', personObject)
      personService
      .create(personObject)
      .then(response => {
        console.log('Setting persons to:')
        console.log(persons.concat(personObject))
        setPersons(persons.concat(personObject))
      })
      setNotification(`${personObject.name} added`)
      setTimeout(() => {
        setNotification('')
      },3000)
    } else {
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number with new one?`)){
        const person = persons.find(p => p.name === newName)
        const changedObject = {... person, number : newPhone }
        personService
          .update(person.id, changedObject)
          .then(response => {
            setPersons(persons.map(p => p.id !== changedObject.id ? p : response.data))
          })
        setNotification(`${personObject.name}'s number updated`)
        setTimeout(() => {
          setNotification('')
        },3000)
      }
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
      <Notification message = {notification} />
      <Error message = {errormsg} />
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
      <PersonsForm
        persons = {persons}
        search = {newSearch}
        del = {handleDelete}
      />
    </div>
  )
}

export default App
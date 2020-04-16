import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'

const FilterForm =(props) => {
  return(
    <div>
    Find countries: <input value = {props.newSearch} onChange = {props.onChange}/>
    </div>
  )
}

const CountriesProp = (props) => {
  console.log('propsit', props)
  return(
    <div>
      {props.map((country) => <Country key = {country.name} name = {country.name}/>)}
    </div>
  )
}

const Country = (props) => {
  return(
    <div>
      {props.name}
    </div>
  )
}

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const handleNewChange = (event) => {
    setSearch(event.target.value)
  }

  const hook = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
    })
  }

  useEffect(hook, [])

  return (
    <div>
      <FilterForm value = {search} onChange = {handleNewChange}/>
      <CountriesProp props = {countries}/>
    </div>
  )
}

export default App;

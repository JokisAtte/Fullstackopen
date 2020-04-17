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
  const countries = props.props
  console.log('countries prop: ', countries)
  return(
    <div>
      {countries.map(country => <Country key = {country.name} name = {country.name}/>)}
    </div>
  )
}

const Country = (props) => {
  console.log('Country', props.name)
  return(
    <div>
      {props.name}
    </div>
  )
}

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([{}])
  const handleNewChange = (event) => {
    setSearch(event.target.value)
  }

  const hook = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      console.log(response.data, 'response data')
      setCountries(response.data)
    })
  }

  useEffect(hook, [])

  console.log(countries, 'App maat')
  return (
    <div>
      <FilterForm value = {search} onChange = {handleNewChange}/>
      <CountriesProp props = {countries}/>
    </div>
  )
}

export default App;

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
  const countries = props.countries
  const toShow = props.countries.filter(country => country.name.includes(props.search) === true)
  return(
    <div>
      {toShow.map((country,i) => <Country key = {i} name = {country.name}/>)}
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
    console.log('haku tallessa', search)
  }

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
      console.log('Maat haettu')
    })
  },[])
 
  console.log(countries)
  return (
    <div>
      <FilterForm value = {search} onChange = {handleNewChange}/>
      <CountriesProp countries = {countries} search = {search}/>
    </div>
  )
}

export default App;

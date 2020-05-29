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
  const toShow = props.countries.filter(country =>
    country.name.includes(props.search) === true)
  if(toShow.length < 10 && toShow.length > 1){
    return(
      <div>
        {toShow.map((country) => <Country key = {country.name} name = {country.name}/>)}
      </div>
    )
  } else if(toShow.length === 1){
    return(
      <div>
        <CountryDetails country = {toShow[0]}/>
      </div>
    )
  } else {
    return(
      <div>
        Too many matches. Please specify another filter
      </div>
    )
  }
}

const CountryDetails = (props) => {
  const country = props.country
  return(
    <div>
    <h1>{country.name}</h1>
    <p>Capital {country.capital}</p>
    <p>Population {country.population}</p>
    <h3>languages</h3>
    <ul>
      {country.languages.map((language,i) => <li key = {i}>{language.name}</li>)}
    </ul>
    <img src = {country.flag} width = '300' border = '1'></img>
    <WeatherDetails capital = {country.capital} />
    </div>
  )
}

const WeatherDetails = (props) => {
  const [weather, setWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  let getstr = `http://api.openweathermap.org/data/2.5/weather?q=${props.capital}&appid=${api_key}&units=metric`
  
  useEffect(() => {
    axios
    .get(getstr)
    .then(response =>{
      setWeather(response.data.main)
      console.log('Sää haettu')
    })
},[])

  return(
    <div>
      <h1>Weather in {props.capital}</h1>
      Tempererature {weather.temp} feels like {weather.feels_like}
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

  useEffect(() => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => {
      setCountries(response.data)
      console.log('Maat haettu')
    })
  },[])
 
  return (
    <div>
      <FilterForm value = {search} onChange = {handleNewChange}/>
      <CountriesProp countries = {countries} search = {search}/>
    </div>
  )
}

export default App;

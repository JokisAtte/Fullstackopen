const express = require('express')
const app = express()

var morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person.js')

//Middlewaret
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

const url =
  process.env.MONGODB_URI  

console.log(url)

let persons = []

app.get('/api/persons', (req,res) => {
  console.log("get /api/persons")
  Person.find({}).then(result => {
    result.forEach(person => {
      persons.concat(person)
      console.log(person)
    })
  })
})

app.get('/api/persons/:id', (req,res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person)
  })
})

app.delete('/api/persons/:id', (req,res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  res.status(204).end()
})

app.post('/api/persons', (req,res) => {
  const person = req.body
  const id = generateId()
  
  if(!person.name){
    return res.status(400).json({
      error: 'name missing'
    })
  }
  if(!person.number){
    return res.status(400).json({
      error: 'number missing'
    })
  }

  const names = persons.map(p => p.name)
  if(names.includes(person.name)){
    return res.status(400).json({
      error: 'Name must be unique'
    })
  }

  const newPerson = new Person({
   name : person.name,
   number: person.number,
   id : id
  })
  
  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

const generateId = () => {
  const max = 1000
  return Math.floor(Math.random()* Math.floor(max))
}

app.get('/info', (reg,res) => {
  console.log(reg.query)
  let today = new Date()
  let date = `${today.getHours()}:${today.getMinutes()} ${today.getDate()}.${today.getMonth() + 1 }.${today.getFullYear()}`
  res.send(`<div> Phonebook has info for ${persons.length} people </div> ${date}`)
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

let persons = [
    {
      "name": "Kalle",
      "number": "123",
      "id": 1
    },
    {
      "name": "Matti",
      "number": "123",
      "id": 2
    }
]

app.get('/', (reg,res) => {
  res.send('<h1> Hello! </h1>')
})

app.get('/api/persons/', (req,res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req,res) => {
  const id = Number(req.params.id)
  const person = persons.find(per => per.id === id)
  res.json(person)
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

  const newName = {
   name : person.name,
   number: person.number,
   id : id
  }
  
  persons = persons.concat(newName)
  res.json(persons)
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

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
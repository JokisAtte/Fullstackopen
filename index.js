require('dotenv').config()
const express = require('express')
const app = express()

var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

//Middlewaret
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)
app.get('/api/persons', (request, response, next) => {
  console.log('GETTAA KAIKKI')
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    person ? response.json(person) : response.status(404).end()
  })
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (req,res,next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req,res,next) => {
  const person = req.body
  console.log('Postataan: ', person.name, '  ', person.number)
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

  const newPerson = new Person({
    name : person.name,
    number: person.number,
    id : id
  })

  newPerson.save().then(savedPerson => {
    response.json(savedPerson)
  })
    .catch(error => next(error))
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

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
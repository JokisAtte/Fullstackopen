
const express = require('express')
const app = express()

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
  const id = req.params.id
  const person = persons.find(per => per.id == id)
  res.json(person)
})

app.get('/info', (reg,res) => {
  console.log(reg.query)
  let today = new Date()
  let date = `${today.getHours()}:${today.getMinutes()} ${today.getDate()}.${today.getMonth() + 1 }.${today.getFullYear()}`
  res.send(`<div> Phonebook has info for ${persons.length} people </div> ${date}`)
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)
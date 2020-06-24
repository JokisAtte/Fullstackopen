const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('Need more arguments! (PW, name, muber)')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@puhelinluettelocluster-v2lrs.mongodb.net/persons-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

person.save().then(response => {
  console.log(`added ${person.name} number ${person.number} to phonebook`)
  mongoose.connection.close()
})
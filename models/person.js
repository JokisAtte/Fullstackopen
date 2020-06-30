const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
console.log(process.argv[2])
const url = process.env.MONGODB_URI || `mongodb+srv://fullstack:${process.argv[2]}@puhelinluettelocluster-v2lrs.mongodb.net/persons-app?retryWrites=true&w=majority`

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then( result => {
        console.log("connected to MongoDB")
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type:  String,
        required: true
    },
    id: Number
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform:(document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
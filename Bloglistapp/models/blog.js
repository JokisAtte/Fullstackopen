const mongoose = require('mongoose')
require('dotenv').config()

const mongoUrl = process.env.MONGODB_URI
console.log(process.env)
console.log("connecting...")
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})
  .then( result => {
    console.log("Connected to mongoDB")
  })
  .catch( error => {
    console.log("Connection to MongoDB failed")
    console.log(error.message)
  })

  const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
  })
  
module.exports = mongoose.model('Blog', blogSchema)
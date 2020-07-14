//Käynnistää palvelimen
const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

const PORT = process.env.PORT || 3003

server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})
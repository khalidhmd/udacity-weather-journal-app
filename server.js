// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const bodyParser = require('body-parser')
const express = require('express')
// Start up an instance of app
const app = express()

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors')
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));



// Setup Server
const server = app.listen(8000, () => {
  console.log('server is listening on port:', 8000)
})

app.get('/all', (req, res) => {
  res.send(JSON.stringify(projectData))
})

app.post('/', (req, res) => {
  projectData.temperature = req.body.temperature
  projectData.date = req.body.date
  projectData.userResponse = req.body.userresponse
  res.end()
})
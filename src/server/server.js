// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require ('body-parser') 
const fetch = require('node-fetch');
const path = require('path');
// Start up an instance of app
const app = express();

app.use(express.static('dist'));

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { RSA_NO_PADDING } = require('constants');
app.use(cors());

// Initialize the main project folder
//GET route

app.get('/all', function (req, res){
    res.send(projectData);
  });

//Post route

let data = [];

app.post('/create', function(req, res){
  projectData = {
    city: req.body.city,
    date: req.body.date,
    temp: req.body.temp,
    icon: req.body.icon,
    description: req.body.description,
    image: req.body.image
  }
});

// Setup Server
const port = 3000;

function listening() {
    console.log(`listening on port ${port}`);
}

app.listen(port, listening());

app.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/index.html'))
});

// Endpoint for testing express server
  app.get('/test', async (req, res) => {
    res.json({message: 'pass!'})
  })

module.exports = app;
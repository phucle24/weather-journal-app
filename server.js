// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencires */
const bodyParser = require('body-parser')

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// GET method route
app.get('/all', function (req, res){
    res.send(projectData);
})

// POST method route
app.post('/addData', postData);
function postData(req, res) {
    projectData = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content
    };
    res.send(projectData);
}

// Setup Server
const port = 3000;

const server = app.listen(port, listening);

function listening(){
    console.log('Server running....');
    console.log(`Running on localhost: ${port}`);
}
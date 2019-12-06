//Importing libraries: 'express' to respond to http requests, 'cors' to access resources from remote hosts,
// 'body-parser' to parse incoming request in a middleware and 'monogoose' for MongoDB object modeling
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

let Event = require('./models/event');
let ClickCounter = require('./models/clickcounter');

var Gpio = require('onoff').Gpio; //include onoff
/*var LED04 = new Gpio(4, 'out'),
LED17 = new Gpio(17, 'out'),
LED27 = new Gpio(27, 'out'),
LED22 = new Gpio(22, 'out'),
LED18 = new Gpio(18, 'out'); // use Gpio on pin 4 and specify that is is output
var leds = [LED04, LED17, LED27, LED22, LED18];*/
var indexCount;
dir;
var LED04,
LED17,
LED27,
LED22,
LED18; // use Gpio on pin 4 and specify that is is output
var leds;
var ledInterval;

const app = express();
//return was comes from express.Router
const router = express.Router();
//attaching the 'cors' method
app.use(cors());
//attaching the bodyParser middleware
app.use(bodyParser.json());
//using mongoose to connect to MongoDB database on port 27017
mongoose.connect('mongodb://localhost:27017/events');
//making a connection that stores what is inside the mongoose.connection
const connection = mongoose.connection;

//add eventListener to the open event
connection.once('open', () =>{
  console.log('MongoDB database connection established sucessfully!');
});
//send HTTP .get request can get back list of events in JSON format
//has 2 parameters a request and response object
router.route('/events').get((req, res) =>{
  //using mongoose to send request to database using a callback function

  Event.find((err, events) =>{
	  //checking for errors
    if (err)
		//printing out the information of error object
      console.log(err);
    else
		//send back reponse in json format containing the events
      res.json(events);
  });
});

// Find events of the day
router.route('/events/:year-:month-:day').get((req, res) =>{
  Event.find(({year: Number(req.params.year), month: Number(req.params.month), day: Number(req.params.day)}), (err, events) =>{
    if (err)
      console.log(err);
    else
      res.json(events);
  });
});

//sending http request to get a single event by 'id'
//'id' is used to retrieve a specific event from the database
router.route('/events/:id').get((req, res) => {
	//using the findById method to retrieve a single event
	//req.params.id returns the value of the parameter 'id'
  Event.findById(req.params.id, (err, event) =>{
	   //checking for errors
      if (err)
    //printing out the information of error object
      console.log(err);
    else
		//send back response in json format containing the events
      res.json(event);
  });
});
//using HTTP post request to add data to the database
//callback function passed into 'post' with request and response parameters
router.route('/events/add').post((req, res) => {

  if (req.body.note == "" || req.body.day == "" || req.body.type == "")
  {
    res.status(200).json({'event': 'Failed', 'reason': 'Begivenhed mangler beskrivelse, dato, og/eller type.'})
    return;
  }
	//creates a new event
	//data gets parsed from the request body
  let  event = new Event(req.body);
  //using mongoose to save to the database
  event.save()
  //using asynchronus connection with '.then'
    .then(event => {
		//send status code of 200 back
		//using json method to send object in json format
      res.status(200).json({'event': 'Success'});
    })
	//using '.catch' to catch errors
    .catch(err => {
		//using callback function for the response object to send back status code of 400
		//using '.send' method to send back text information
      res.status(400).json({'event': 'Failed', 'reason': 'Der opstod en fejl. Prøv igen senere.'});
    });
});
//for updating existing events
router.route('/events/update/:id').post((req, res) => {
	//to retrieve the old record from the database 'findById' is used
  Event.findById(req.params.id, (err, event) => {
	  //checking if events is available
    if (!event)
		//if events cant be retrieved, an error is thrown
      return next(new Error('Could not load document'));
    else{
		//if events is retrieved from database
		//event object with the properties get updated with values from 'req.body'
      event.notify = req.body.notify;
      event.type = req.body.type;
      event.note = req.body.note;
      event.year = req.body.year;
      event.month = req.body.month;
      event.day = req.body.day;
      event.time = req.body.time;
      event.people = req.body.people;
      event.place = req.body.place;
	//for the updated object to be saved in the database with a save function
      event.save().then(event => {
		  //using response object to return text information in .json format
        res.json({'event': 'Success'});
		//catching errors
      }).catch(err => {
		  //send back status of 400 with the response object
        res.status(400).json({'event': 'Failed', 'reason': 'Der opstod en fejl. Prøv igen senere.'});
      });
    }
  });
});
//For deleting events by the id
router.route('/events/delete/:id').get((req, res) => {
	//to delete an event the findByIdAndRemove method is used
  Event.findByIdAndRemove({_id: req.params.id}, (err, event)  =>{
    //checking for errors
    if (err)
      res.json({'event': 'Failed', 'reason': 'Der opstod en fejl. Prøv igen senere.'});
  //if no errors occured, res.json is used to return the text
    else
      res.json({'event': 'Success'});
  });
});

router.route('/clickcounter/update').get((req, res) => {
  ClickCounter.find((err, clickcounter) =>{ // find all ClickCounters
    clickcounter = clickcounter[0]; // (there's only 1, so just pick that)
    if (err)
    {
      console.log(err);
      res.status(200).json({'event': 'Failed', 'reason': 'Der opstod en fejl ved opdatering af klik.'})
      return;
    }
    else if (!clickcounter) // didn't find any? Create one
    {
      clickcounter = new ClickCounter({count: 1}); // default value
    }
    else
    {
      clickcounter.count = clickcounter.count + 1;
    }

    if (clickcounter)
    {
      let count = clickcounter.count;
      clickcounter.save().then(count => { res.status(200).json({'event': 'Success (' + count + ')'})});
    }
    else
    {
      res.status(200).json({'event': 'Failed'});
    }
  });
});

router.route('/lights/start').get((req, res) => {
  // CODE TO START LIGHTS HERE
  var indexCount = 0;
  dir = "up";
  LED04 = new Gpio(4, 'out'),
  LED17 = new Gpio(17, 'out'),
  LED27 = new Gpio(27, 'out'),
  LED22 = new Gpio(22, 'out'),
  LED18 = new Gpio(18, 'out'); // use Gpio on pin 4 and specify that is is output
  leds = [LED04, LED17, LED27, LED22, LED18];
  ledInterval = setInterval(flowingLeds, 100);
  });

router.route('/lights/stop').get((req, res) => {
  // CODE TO STOP LIGHTS HERE
  //  clearInterval(ledInterval);
  //  LED.writeSync(0);
    stopFlowingLeds();
});
/* function blinkLED() { //blinking function
  if (LED.readSync() === 0) { //Check if the pin is of (0)
    LED.writeSync(1); //set the pin tate to on (1)
  }else{
    LED.writeSync(0); // turn of LED
  }
} */

function flowingLeds() { //function for flowing Leds
  leds.forEach(function(currentValue) { //for each item in array
    currentValue.writeSync(0); //turn off LED
  });
  if (indexCount == 0) dir = "up"; //set flow direction to "up" if the count reaches zero
  if (indexCount >= leds.length) dir = "down"; //set flow direction to "down" if the count reaches 7
  if (dir == "down") indexCount--; //count downwards if direction is down
  leds[indexCount].writeSync(1); //turn on LED that where array index matches count
  if (dir == "up") indexCount++ //count upwards if direction is up
};

function stopFlowingLeds() {
    clearInterval(ledInterval);
    leds.forEach(function(currentValue) { //for each LED
      currentValue.writeSync(0);
      currentValue.unexport(); //unexport GPIO
      });
};


//to attach the middleware to the router
app.use('/', router);
//Callback function, that the server is running on port 4000
app.listen(4000, () => console.log('Express server running on port 4000'));

//Importing libraries: 'express' to respond to http requests, 'cors' to access resources from remote hosts,
// 'body-parser' to parse incoming request in a middleware and 'monogoose' for MongoDB object modeling
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Event from './models/Event';

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
	//creates a new event
	//data gets parsed from the request body
  let  event = new Event(req.body);
  //using mongoose to save to the database
  event.save()
  //using asynchronus connection with '.then'
    .then(event => {
		//send status code of 200 back
		//using json method to send object in json format
      res.status(200).json({'event': 'Added succesfully'});
    })
	//using '.catch' to catch errors
    .catch(err => {
		//using callback function for the response object to send back status code of 400 
		//using '.send' method to send back text information
      res.status(400).send('Failed to create new record');
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
      event.title = req.body.title;
      event.responsible = req.body.responsible;
      event.description = req.body.description;
      event.severity = req.body.severity;
      event.status = req.body.status;
	//for the updated object to be saved in the database with a save function
      event.save().then(event => {
		  //using response object to return text information in .json format
        res.json('Update done');
		//catching errors
      }).catch(err => {
		  //send back status of 400 with the response object
        res.status(400).send('Update failed');
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
      res.json(err);
  //if no errors occured, res.json is used to return the text 
    else
      res.json('Remove succesfull');
  });
});

//to attach the middleware to the router
app.use('/', router);
//Callback function, that the server is running on port 4000
app.listen(4000, () => console.log('Express server running on port 4000'));

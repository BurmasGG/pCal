//import mongoose from 'mongoose';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let Event = new Schema({
  type: {
    type: String
  },
  year: {
    type: Number
  },
  month: {
    type: Number
  },
  day: {
    type: Number
  },
  time: {
    type: String
  },
  note:{
    type: String
  },
  people: {
    type: String,
  },
  place: {
    type: String,
  }
});

//export default mongoose.model('Event', Event);
module.exports = mongoose.model('Event', Event);
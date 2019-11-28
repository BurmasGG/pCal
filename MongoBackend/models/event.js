import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Event = new Schema({
  title: {
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
  participant: {
    type: String,
  },
  place: {
    type: String,
  }
});

export default mongoose.model('Event', Event);
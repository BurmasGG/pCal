import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Event = new Schema({
  title: {
    type: String
  },
  date: {
    type: String
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
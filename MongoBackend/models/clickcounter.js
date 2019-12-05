//import mongoose from 'mongoose';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let ClickCounter = new Schema({
  count: {
    type: Number
  }
});

module.exports = mongoose.model('ClickCounter', ClickCounter);
// const { model } = require("mongoose");
const mongoose = require("mongoose");

// create schema
const eventsSchema = new mongoose.Schema({
  title: String,
  cost: Number,
  category: String,
});

const Event = mongoose.model("Event", eventsSchema);
module.exports = Event;

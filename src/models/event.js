// const { model } = require("mongoose");
const mongoose = require("mongoose");

// create schema
const eventsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },

  cost: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: ["party", "meeting", "other"],
  },
});

const Event = mongoose.model("Event", eventsSchema);
module.exports = Event;

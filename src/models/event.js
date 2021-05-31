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
    min: [1],
  },
  category: {
    type: String,
    required: true,
    enum: ["business", "casual", "party", "general"],
  },
  imageURL: {
    type: String,
  },
});

const Event = mongoose.model("Event", eventsSchema);
module.exports = Event;

const express = require("express");
const app = express();
const port = 4000;

// set up mongoose
const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/events-manager";

mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("database connection successful");
    }
  }
);

// create schema
const eventsSchema = new mongoose.Schema({
  title: String,
  cost: Number,
  category: String,
});

const Event = mongoose.model("Event", eventsSchema);

Event.create(
  {
    title: "Bob's birthday",
    cost: 100,
    category: "celebration",
  },
  (err, event) => {
    if (err) {
      console.log(err);
    } else {
      console.log(event);
    }
  }
);

app.listen(port, () => console.log(`app listening on port ${port}`));

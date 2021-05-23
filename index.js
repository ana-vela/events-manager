const express = require("express");
const app = express();
const port = 4000;

// set up mongoose
const mongoose = require("mongoose");
const connectionString = "mongodb://localhost:27017/events-manager";

app.use(express.json());

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

// POST request to /events to create a new event
app.post("/events", function (req, res) {
  //retrieve new event details from req.body
//   const event = req.body.event;
  Event.create(
    {
      title: event.title,
      cost: event.cost,
      category: event.category,
    },
    (err, newEvent) => {
      if (err) {
        return res.status(500).json({ message: err })
      } else {
        return res.status(200).json({ message: "new event created", newEvent });
      }
    }
  );
  console.log({ event });
  //create a new event and save to db
  //send response to client
});

// GET request to /events to fetch all events
app.get("/events", (req, res) => {
  // fetch all events
  Event.find({}, (err, events) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else {
      return res.status(200).json({ events });
    }
  });

  // send response to client
});
// GET request to /events/:id to fetch single event
// PUT request to /events/:id to update a single event
// DELETE REQUEST to /books/:id to delete event

app.listen(port, () => console.log(`app listening on port ${port}`));

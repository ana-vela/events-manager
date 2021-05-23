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
        return res.status(500).json({ message: err });
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
app.get("/events/:id", (req, res) => {
  Event.findById(req.params.id, (err, event) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else if (!event) {
      return res.status(404).json({ message: "event not found" });
    } else {
      return res.status(200).json({ event });
    }
  });
});

// PUT request to /events/:id to update a single event
app.put("/events/:id", (req, res) => {
  Event.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      cost: req.body.cost,
      category: req.body.category,
    },
    (err, event) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else if (!event) {
        return res.status(404).json({ message: "event not found" });
      } else {
        event.save((err, savedEvent) => {
          if (err) {
            return res.status(400).json({ message: err });
          } else {
            return res
              .status(200)
              .json({ message: "event saved successfully" });
          }
        });
      }
    }
  );
});

// DELETE REQUEST to /events/:id to delete event

app.delete("/events/:id", (req, res) => {
    Event.findByIdAndDelete(req.params.id, (err, event) => {
        if (err) {
            return res.status(500).json({ message: err})
        } else if (!event) {
            return res.status(404).json({ message: "event was not found"})
        } else {
            return res.status(200).json({message: "event deleted successfully" })
        }
    } )
})

app.listen(port, () => console.log(`app listening on port ${port}`));

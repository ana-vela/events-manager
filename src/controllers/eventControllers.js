const Event = require('../models/event')

exports.createNewEvent = function (req, res) {
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
};
exports.fetchEvents = (req, res) => {
  // fetch all events
  Event.find({}, (err, events) => {
    if (err) {
      return res.status(500).json({ message: err });
    } else {
      return res.status(200).json({ events });
    }
  });
};

exports.fetchSingleEvent = (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else if (!event) {
        return res.status(404).json({ message: "event not found" });
      } else {
        return res.status(200).json({ event });
      }
    });
  };


  exports.updateSingleEvent = (req, res) => {
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
  }


exports.deleteSingleEvent = (req, res) => {
    Event.findByIdAndDelete(req.params.id, (err, event) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else if (!event) {
        return res.status(404).json({ message: "event was not found" });
      } else {
        return res.status(200).json({ message: "event deleted successfully" });
      }
    });
  };

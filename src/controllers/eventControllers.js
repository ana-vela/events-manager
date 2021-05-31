const Event = require("../models/event");
const request = require("request");

exports.createNewEvent = function (req, res) {
  //retrieve new event details from req.body
  //   const event = req.body.event;
  const imageURL =
    "https://imagegen.herokuapp.com/?category=" + req.body.category;
  Event.create(
    {
      ...req.body,
    },
    (err, newEvent) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else {
        request(imageURL, (err, response, body) => {
          if (err) {
            return res.status(500).json({ message: err });
          } else {
            console.log(body);
            const imagePath = JSON.parse(body);
            newEvent.imageURL = imagePath.image;
            newEvent.save((err, savedEvent) => {
              if (err) {
                return res.status(500).json({ message: err });
              } else {
                return res.status(200).json({ savedEvent });
              }
            });
          }
        });
      }
    }
  );
};
exports.fetchEvents = (req, res) => {
  console.log({ user: req.user });
  let conditions = {};
  if (req.query.category) {
    conditions.category = req.query.category;
  }
  // fetch all events
  console.log(conditions);
  console.log(req.query);
  Event.find(conditions, (err, events) => {
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
      image: req.body.imageURL,
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
};

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

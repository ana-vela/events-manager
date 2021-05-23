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

app.listen(port, () => console.log(`app listening on port ${port}`));

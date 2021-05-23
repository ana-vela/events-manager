const express = require("express");
const app = express();
const port = 4000;
const dbSetup = require("./database/setup");
const eventRoutes = require("./routes/eventRoutes");

app.use(express.json());

// setup mongoose
dbSetup();
app.use(eventRoutes);

// setup schema
const Event = require("./models/event");

app.listen(port, () => console.log(`app listening on port ${port}`));

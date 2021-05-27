const express = require("express");
const app = express();
const port = 4000;
const dbSetup = require("./database/setup");

// Require routes
const eventRoutes = require("./routes/eventRoutes");
const authRoutes = require("./routes/authRoutes");
app.use(express.json());

// setup mongoose
dbSetup();

app.use("/auth", authRoutes);
app.use(eventRoutes);

// setup schema
const Event = require("./models/event");

app.listen(port, () => console.log(`app listening on port ${port}`));

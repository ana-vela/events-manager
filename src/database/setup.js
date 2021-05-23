// set up mongoose
const mongoose = require("mongoose");

module.exports = function () {

  const connectionString = `mongodb+srv://AnaTestUser:MYSecurePass@eventmanager.giipr.mongodb.net/EventManager?retryWrites=true&w=majority`
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
};

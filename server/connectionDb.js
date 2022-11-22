const mongoose = require("mongoose");
module.exports.connectionDb = () => {
  uri = process.env.ATLAS_URI;
  mongoose.connect(uri);
  mongoose.connection.on("connected", () => {
    console.log("successfully connected");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("failed connection");
  });
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};

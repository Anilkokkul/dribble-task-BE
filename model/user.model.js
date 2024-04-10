const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  userName: String,
  email: String,
  hashedPassword: String,
  imageURL: String,
  location: String,
  preference: String,
});

module.exports = mongoose.model("Users", userSchema);

const mongoose = require("mongoose");

exports.db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB connection established");
  } catch (error) {
    console.log("Error while connecting Database...", error);
  }
};

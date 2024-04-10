const express = require("express");
require("dotenv").config();
const cors = require("cors");
const { db } = require("./db/db.connect");
const userRoutes = require("./routes/user.routes");
db();
const corsOptions = {
  origin: ["http://localhost:3000"],
};
const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(userRoutes);
const port = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to the API</h1>`);
});

app.listen(port, () => {
  console.log("listening on port " + port);
});

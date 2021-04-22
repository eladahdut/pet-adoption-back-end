const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");
const mongoConnectToDB = require('./mongo/mongo')

const postsRoute = require("./routes/posts");
const petsRoute = require("./routes/petsNew");

app.use(cors());
app.use(bodyParser.json());
app.use("/pets", petsRoute);
app.use("/posts", postsRoute);


app.get("/", (req, res) => {
  res.send("we are on home");
});

// mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
//   console.log("connected to DB")
// );

app.listen(3000);

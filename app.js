const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");
const mongoConnectToDB = require("./mongo/mongo");

const petsRoute = require("./routes/pets");
const usersRoute = require("./routes/users");

app.use(cors());
app.use(bodyParser.json());
app.use("/pets", petsRoute);
app.use("/users", usersRoute);

app.get("/", (req, res) => {
  res.send("we are on home");
});

// const port_number = server.listen(process.env.PORT || 3000);
app.listen(process.env.PORT || 3000);

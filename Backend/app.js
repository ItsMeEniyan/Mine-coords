const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const cors = require("cors");
app.use(cors());

const URI =process.env.MONGODBURL;

const connectfun = async () => {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

connectfun();
const con = mongoose.connection;

con.on("open", function () {
  console.log("Hey!!! Db connected.......");
});

app.use(express.json());

const worldRouter = require("./Routes/world");
app.use("/world", worldRouter);

app.listen(process.env.PORT | 9000, function () {
  console.log("Server started.......");
});

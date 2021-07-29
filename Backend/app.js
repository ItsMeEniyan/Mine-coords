const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
app.use(cors());

const URI = process.env.MONGODBURL;

const connectfun = async () => {
  await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
app.use(
  session({
    secret: "Our little secret.",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

connectfun();
const con = mongoose.connection;

mongoose.set("useCreateIndex", true);

con.on("open", function () {
  console.log("Hey!!! Db connected.......");
});

app.use(express.json());

const worldRouter = require("./Routes/world");
app.use("/world", worldRouter);

const userRouter = require("./Routes/user");
app.use("/", userRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../frontend/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "build", "index.html"));
  });
}

app.listen(process.env.PORT || 9000, function () {
  console.log("Server started.......");
});

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors());

const URI =
  "mongodb+srv://eniyan:123env@coords.lqkre.mongodb.net/world?retryWrites=true&w=majority";

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

app.listen(9000, function () {
  console.log("Server started.......");
});

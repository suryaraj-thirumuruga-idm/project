// step 1

const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./Router/UserRouter");
const exprouter =require("./Router/expense")

app.use(cors());

// Step =2

const mongoose = require("mongoose");
const DBUrl =
  "mongodb+srv://root:root@suryraj.gfokr.mongodb.net/?retryWrites=true&w=majority&appName=suryraj";

mongoose.set("strictQuery", true);
mongoose.connect(DBUrl, (err) => {
  if (err) {
    console.log("Error:", err);
  } else {
    console.log("DB Connected Successfully");
  }
});

// step 3
// get schema from another page


app.use(express.json());

app.use("/exp",exprouter)
app.use("/user", router);
app.listen(900, console.log("runing..."));

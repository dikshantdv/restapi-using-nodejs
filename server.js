const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const subscriberRouter = require("./routes/subscriberRouter");

app = express();
app.use(express.json());
dotenv.config();

mongoose.connect(process.env.DATABASE_URL, () => {
  console.log("Connection to db successful");
});

app.use("/subscribers", subscriberRouter);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});

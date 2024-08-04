import express from "express";
import mongoose from "mongoose";
import todoHandler from "./routes/todoHandler.js";
import {userHandler} from "./routes/userHandler.js";

//app initialization
const app = express();

app.use(express.json());

//connect with mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017/todolist")
  .then(() => console.log("connection successful"))
  .catch((e) => console.log(e));
//app routes
app.use('/todo',todoHandler)
app.use('/user',userHandler)


//error handler
const errorHander = (err, req, res, next) => {
  if (res.headerSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};
app.use(errorHander)

app.listen(3000, () => {
  console.log("server is running on the background");
});

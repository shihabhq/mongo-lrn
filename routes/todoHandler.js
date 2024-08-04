import express from "express";
import PostSchema from "../schemas/todoSchema.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import testValidity from "../middlewares/checkLogin.js";
import checkLogin from "../middlewares/checkLogin.js";


//initialize handler
const todoHandler = express.Router();

//initialize postModel
const Todo = new mongoose.model("Todo", PostSchema);

//get all the todos
todoHandler.get("/",testValidity, async (req, res) => {
  try {
    const data = await Todo.find({}, { title: 1, _id: 0 });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({msg:'internal server error'});
  }
});

//get a todo by Id
todoHandler.get("/:id", async (req, res) => {
  try {
    const data = await Todo.find({_id:new ObjectId(req.params.id)});
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send({msg:'internal server error'});
  }
});

PostSchema.query = {
  byLang:function(lang){
    return this.find({title: new RegExp(lang,'i')})
  }
}

//post todo
todoHandler.post("/",checkLogin, async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(201).send("successfully added todo");
  } catch (error) {
    res.status(500).send({msg:'internal server error'});
  }
});

//update todo
todoHandler.put("/:id", async (req, res) => {
  try {
    await Todo.updateMany(
      { _id: new ObjectId(req.params.id) }, // Use ObjectId correctly
      { $set: req.body }
    );
    res.status(200).send('updated successfully'); // Use status 200 for successful update
  } catch (error) {
    res.status(500).send({msg:'internal server error'});
  }
});


//delete todo
todoHandler.delete("/:id", async (req, res) => {
  try {
    await Todo.deleteOne({_id: new ObjectId(req.params.id)})
    res.status(200).send('deleted successfully')
  } catch (error) {
    res.status(500).send({msg:'internal server error'});
  }
});

export default todoHandler;

import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: ObjectId,
    ref:'User' //one to one relation

  },
});

export default PostSchema;

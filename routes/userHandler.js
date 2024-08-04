import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import userSchema from "../schemas/userSchema.js";
import jwt from "jsonwebtoken";

const userHandler = express.Router();
const User = new mongoose.model("User", userSchema);

const secretKey = "llakjs;dlkjfa;sd";

//sign up
userHandler.post("/signup", async (req, res) => {
  try {
    const hashedPass = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      name: req.body.name,
      username: req.body.username,
      password: hashedPass,
    };
    await User.create(newUser);
    res.status(200).send("signed up successfully");
  } catch (error) {
    res.status(500).send("unexpected error occured");
  }
});

//login route
userHandler.post("/login", async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });
    if (user && user.length > 0) {
      const isValidPass = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPass) {
        //generate token
        const token = jwt.sign(
          {
            username: user[0].username,
            userId: user[0]._id,
          },
          secretKey,
          {
            expiresIn: "1h",
          }
        ); //secret key, note that a best practice is to keep this one in .env
        res
          .status(200)
          .send({ token: token, msg: "accessed token successfully" });
      } else {
        res.status(401).send("authentication error");
      }
    } else {
      res.status(401).send("authentication error");
    }
  } catch (error) {
    res.status(401).send("authentication error");
  }
});

export  {userHandler,secretKey};

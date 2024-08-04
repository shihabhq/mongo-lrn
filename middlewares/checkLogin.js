import jwt from 'jsonwebtoken';
import { secretKey } from "../routes/userHandler.js";

const checkLogin = (req, res, next) => {
  //get token from header
  const { authorization } = req.headers;

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    const { username, userId } = decoded;
    req.username = username;
    req.userId = userId;

    next();
  } catch (error) {
    next("authenication failure");
  }
};

export default checkLogin;

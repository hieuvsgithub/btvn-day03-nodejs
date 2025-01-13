import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { undefined } from "zod";

dotenv.config({});

const { SECRET_KEY } = process.env;

export const register = async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });
    if (data) {
      return res.status(400).json({ message: "tai khoan da ton tai" });
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    let user = await User.create({
      ...req.body,
      password: secPass,
    });

    res.status(201).json({ message: "dang ki thanh cong", user });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const data = await User.findOne({ email: req.body.email });
    if (!data) {
      return res.status(400).json({ message: "tai khoan chua ton tai" });
    }
    const passwordCompare = await bcrypt.compare(
      req.body.password,
      data.password
    );
    if (!passwordCompare) {
      return res.status(400).json({ message: "mat khau ko chinh xac" });
    }
    const accessToken = jwt.sign(
      {
        _id: data._id,
      },
      SECRET_KEY,
      { expiresIn: "10d" }
    );
    data.password = undefined;
    return res
      .status(200)
      .json({ message: "dang nhap thanh cong", accessToken, user: data });
  } catch (error) {}
};

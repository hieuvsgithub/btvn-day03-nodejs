import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "member",
      enum: ["member", "admin", "superAdmin"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const User = mongoose.model("User", userSchema); //model:  1 ham tao ra 1 khuan mẫu "User" theo mẫu là userSchema
export default User;

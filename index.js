import express from "express";
import mongoose, { connect } from "mongoose";
import routes from "./src/routes/index.js";
import connectDB from "./src/config/db.js";
import dotenv from "dotenv";

dotenv.config();

const { PORT } = process.env;

const app = express();
app.use(express.json());

connectDB();

app.use("/", routes);

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.listen(PORT, () => {
  console.log("Server is running on port 3000");
});

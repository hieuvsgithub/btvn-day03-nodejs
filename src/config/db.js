import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const { MONGO_URI } = process.env;

const connectDB = async () => {
  try {
    const connected = await mongoose.connect(MONGO_URI);
    console.log(`connected Mongoose:${connected.connection.host}`);
  } catch (error) {
    console.error(`Error:${error.message}`);
    process.exit(1); // dừng ứng dụng nếu kết nối thất bại
  }
};

export default connectDB;

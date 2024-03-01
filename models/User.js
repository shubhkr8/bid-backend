import mongoose from "mongoose";

const USER_Schema = new mongoose.Schema({
  usr_name: { type: String, unique: true },
  pswrd: String,
  role: String,
});

export const USER_Model = mongoose.model("user", USER_Schema);

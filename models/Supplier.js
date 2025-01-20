import mongoose from "mongoose";

const Supplier_Schema = new mongoose.Schema({
  serial_no: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
  },
  timestamp: String,
  supplier_name: String,
  phone_no: String,
  address: String,
  materail_1: String,
  materail_2: String,
  materail_3: String,
  email: String,
  tag: String,
});

export const Supplier_Model = mongoose.model(
  "supplier",
  Supplier_Schema
);

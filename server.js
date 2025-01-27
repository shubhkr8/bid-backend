import { RFQ_Submit_Model, RFQ_Acknowledge_Model } from "./models/Rfq.js";
import { Supplier_Model } from "./models/Supplier.js";
import { USER_Model } from "./models/User.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Connect to MongoDB (replace 'your_mongodb_connection_string' with your actual MongoDB connection string)
mongoose.connect(
  "mongodb+srv://shubhamkr8:74824Singh0767@cluster0.sy4eond.mongodb.net/RFQ_BID"
);

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.send("Jai Shree Ram");
});

app.get("/api/ack-data", async (req, res) => {
  try {
    const data = await RFQ_Acknowledge_Model.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/supplier-data", async (req, res) => {
  try {
    const data = await Supplier_Model.find();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/api/form-no", async (req, res) => {
  try {
    const highestSerialNo = await RFQ_Acknowledge_Model.findOne().sort({
      serial_no: -1,
    });
    const nextSerialNo = parseInt(highestSerialNo.serial_no) + 1;
    res.json({ nextSerialNo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/supplier-form-no", async (req, res) => {
  try {
    const highestSerialNo = await Supplier_Model.findOne().sort({
      serial_no: -1,
    });
    const nextSerialNo = highestSerialNo ? parseInt(highestSerialNo?.serial_no) + 1 : 1;
    res.json({ nextSerialNo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/submit-form", async (req, res) => {
  try {
    const formData = new RFQ_Submit_Model(req.body);
    await formData.save();
    res.json({ success: true, message: "Form submitted successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.post("/api/acknowledge-form", async (req, res) => {
  try {
    const response = await fetch("https://resoo-backend.onrender.com/api/form-no");
    const { nextSerialNo } = await response.json();
    const formData = new RFQ_Acknowledge_Model({
      ...req.body,
      serial_no: nextSerialNo
    });
    await formData.save();
    res.json({ success: true, message: "Form Acknowledge successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.post("/api/supplier", async (req, res) => {
  try {
    const response = await fetch("https://resoo-backend.onrender.com/api/supplier-form-no");
    const { nextSerialNo } = await response.json();
    const formData = new Supplier_Model({
      ...req.body,
      serial_no: nextSerialNo
    });
    await formData.save();
    res.json({ success: true, message: "Form Supplier successfully!" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// Register endpoint
app.post("/api/register", async (req, res) => {
  try {
    const { usr_name, pswrd, role } = req.body;

    // Check if username already exists
    const existingUser = await USER_Model.findOne({ usr_name });
    if (existingUser) {
      return res.status(400).send("Username already exists");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(pswrd, 10);

    // Create a new user document with role
    const newUser = new USER_Model({ usr_name, pswrd: hashedPassword, role });

    // Save the new user document to the database
    await newUser.save();

    res.status(201).send("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error registering user");
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { usr_name, pswrd } = req.body;
    const user = await USER_Model.findOne({ usr_name });
    if (!user) {
      return res.status(400).send("Invalid username or password");
    }
    const validPassword = await bcrypt.compare(pswrd, user.pswrd);
    if (!validPassword) {
      return res.status(400).send("Invalid username or password");
    }
    res.status(200).json({ message: "Login successful", role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

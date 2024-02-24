import { RFQ_Submit_Model, RFQ_Acknowledge_Model } from "./models/Rfq.js";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Connect to MongoDB (replace 'your_mongodb_connection_string' with your actual MongoDB connection string)
mongoose.connect(
  "mongodb+srv://shubhamkr8:74824Singh0767@cluster0.sy4eond.mongodb.net/RFQ_BID"
);

app.use(bodyParser.json());

// Middleware to automatically increment case_no
// app.use(async (req, res, next) => {
//   try {
//     const maxCaseNoDoc = await RFQ_Submit_Model.findOne()
//       .sort({ case_no: -1 })
//       .limit(1);
//     const maxCaseNo = maxCaseNoDoc ? maxCaseNoDoc.case_no : 0;

//     req.body.case_no = maxCaseNo + 1;
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// });

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
    const formData = new RFQ_Acknowledge_Model(req.body);
    await formData.save();
    res.json({ success: true, message: "Form Acknowledge successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

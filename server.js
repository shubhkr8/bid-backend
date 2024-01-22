const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS
app.use(cors());

// Connect to MongoDB (replace 'your_mongodb_connection_string' with your actual MongoDB connection string)
mongoose.connect(
  "mongodb+srv://shubhamkr8:74824Singh0767@cluster0.sy4eond.mongodb.net/"
);

const RFQ_Submit_Schema = new mongoose.Schema({
  rfq_no: String,
  buyer: String,
  buyer_no: String,
  bid_class: String,
  scope: String,
  material_line_items: String,
  delivery_pin: String,
  landing_cost: String,
  frieght: String,
  vendor_id: String,
  bid_type: String,
});

const RFQ_Submit_Model = mongoose.model("RFQ_Submit", RFQ_Submit_Schema);

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  res.send("Jai Shree Ram");
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

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

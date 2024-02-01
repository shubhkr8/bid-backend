import mongoose from "mongoose";

const RFQ_Submit_Schema = new mongoose.Schema({
  rfq_no: String,
  rfq_start_date: String,
  rfq_end_date: String,
  buyer: String,
  buyer_no: String,
  bid_class: String,
  scope: String,
  material_series: Array,
  material_line_items: String,
  basic_value: String,
  delivery_pin: String,
  landing_cost: String,
  gst_freight_tax: String,
  frieght: String,
  vendor_id: String,
  bid_type: String,
});

const RFQ_Acknowledge_Schema = new mongoose.Schema({
  rfq_no: String,
  rfq_start_date: String,
  rfq_end_date: String,
  buyer: String,
  buyer_no: String,
  scope: String,
  material_series: Array,
  material_line_items: String,
  shipping_address: String,
  delivery_pin: String,
  bid_type: String,
});

export const RFQ_Submit_Model = mongoose.model("rfq_submit", RFQ_Submit_Schema);

export const RFQ_Acknowledge_Model = mongoose.model(
  "rfq_acknowledge",
  RFQ_Acknowledge_Schema
);

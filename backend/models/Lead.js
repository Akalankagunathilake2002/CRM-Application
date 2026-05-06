const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    leadName: {
      type: String,
      required: true,
      trim: true
    },

    companyName: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true
    },

    leadSource: {
      type: String,
      required: true,
      enum: ["Website", "LinkedIn", "Referral", "Cold Email", "Event", "Other"]
    },

    assignedSalesperson: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Proposal Sent", "Won", "Lost"],
      default: "New"
    },

    estimatedDealValue: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Lead", leadSchema);
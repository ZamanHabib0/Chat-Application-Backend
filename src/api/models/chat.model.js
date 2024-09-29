const mongoose = require("mongoose");

const ChatSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      index: true,
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: "user",
      index: true, 
    },
    message: {
      type: String,
      required: true,
    },
    readReceipts: {
      type: String,
      enum: ["sent", "delivered", "seen", "unseen"],
      default: "sent", 
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("chat", ChatSchema);

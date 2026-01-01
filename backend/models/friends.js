const mongoose = require("mongoose");

const friendsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true},
  friend_id: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
},{ timestamps: true });

module.exports = mongoose.model("Friends", friendsSchema);
